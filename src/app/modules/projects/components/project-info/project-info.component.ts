import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CollaboratorListComponent } from '../collaborator-list/collaborator-list.component';

interface UserData {
  userId: number;
  username: string;
  mail: string;
  itemQuantities: number;
  subitemQuantities: number;
  estimatedCost: number;
  actualCost: number;
  budget: number;
}

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [CommonModule, CollaboratorListComponent],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent {
  data = input<any>();

  get project() {
    const project = this.data().project;
    const items = project.items;
    const budgets = items.reduce(
      (obj: any, item: any) => {
        obj.totalActual += parseFloat(item.actual_cost || 0);

        const subitems = item.subitems.reduce(
          (acc: any, subitem: any) => {
            acc.estimated += parseFloat(subitem.estimated_cost || 0);
            acc.actual += parseFloat(subitem.actual_cost || 0);
            return acc;
          },
          { estimated: 0, actual: 0 }
        );

        obj.totalEstimated += subitems.estimated;
        obj.totalActualEstimated += (+item.budget);
        return obj;
      },
      { totalActual: 0, totalEstimated: 0, totalActualEstimated: 0 }
    );

    return { ...project, ...budgets };
  }

  get deviation(): number {
    return (
      (this.project?.totalActual || 0) - (this.project?.totalEstimated || 0)
    );
  }

  get budgetStatus(): 'safe' | 'warning' | 'danger' {
    const actual = this.project?.totalActual || 0;
    const estimated = this.project?.totalEstimated || 0;
    const percentage = actual / estimated;

    if (percentage < 0.9) return 'safe';
    if (percentage < 1.0) return 'warning';
    return 'danger';
  }

  get deviationPercentage(): number | null {
    const estimated = this.project?.totalEstimated || 0;
    if (estimated === 0) return null; // evita divisão por zero
    return (this.deviation / estimated) * 100;
  }

  get realPercentage(): number {
    return (
      ((this.project.totalActual > this.project.budget
        ? this.project.budget
        : this.project.totalActual) /
        this.project.budget) *
      100
    );
  }

  get remainingValue(): number {
    const value = this.project.budget - this.project.totalActual;
    return value > 0 ? value : 0;
  }

  get remainingPercentage(): number {
    return (this.remainingValue / this.project.budget) * 100;
  }

  get overPercentage(): number {
    return (this.deviation / this.project.budget) * 100;
  }

  get financeCollaborators() {
    const usersMap = new Map<number, UserData>();

    for (const item of this.project.items) {
      const itemBudget = parseFloat(item.budget || 0);
      const itemUser = item.users;

      if (itemUser) {
        if (!usersMap.has(itemUser.id)) {
          usersMap.set(itemUser.id, {
            userId: itemUser.id,
            username: itemUser.username,
            mail: itemUser.email,
            estimatedCost: 0,
            actualCost: 0,
            budget: 0,
            itemQuantities: 0,
            subitemQuantities: 0,
          });
        }

        const userData = usersMap.get(itemUser.id)!;
        userData.budget += itemBudget;
        userData.itemQuantities += 1;
      }

      for (const subitem of item.subitems) {
        const subUser = subitem.users;
        if (!subUser) continue;

        if (!usersMap.has(subUser.id)) {
          usersMap.set(subUser.id, {
            userId: subUser.id,
            username: subUser.username,
            mail: subUser.email,
            estimatedCost: 0,
            actualCost: 0,
            budget: 0,
            itemQuantities: 0,
            subitemQuantities: 0,
          });
        }

        const userData = usersMap.get(subUser.id)!;
        userData.estimatedCost += parseFloat(subitem.estimated_cost || 0);
        userData.actualCost += parseFloat(subitem.actual_cost || 0);
        userData.subitemQuantities += 1;
      }
    }

    return Array.from(usersMap.values());
  }

  getDesvio(user: UserData): number {
    return user.actualCost - user.estimatedCost;
  }

  get totalSubitems() {
    let total = 0;
    for (const item of this.project.items) {
      total += item.subitems.length;
    }
    return total;
  }

  get totalItems() {
    return this.project.items.length;
  }

  get completedItems() {
    return this.project.items.filter((item: any) => item.status == 'completed')
      .length;
  }

  get completedSubitems() {
    let total = 0;

    return this.project.items.reduce((acc: number, item: any) => {
      total += item.subitems.filter(
        (subitem: any) => subitem.status == 'completed'
      ).length;
      return total;
    }, 0);
  }

  get itemProgressPercentage() {
    return Math.round((this.completedItems / this.totalItems) * 100);
  }

  get subitemProgressPercentage() {
    return Math.round((this.completedSubitems / this.totalSubitems) * 100);
  }

  showFullDescription = false;

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
  get shortDescription(): string {
    return this.project.description.length > 255
      ? this.project.description.substring(0, 255) + '...'
      : this.project.description;
  }
}
