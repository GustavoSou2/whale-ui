import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'collaborator-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.scss',
})
export class CollaboratorListComponent {
  @Input({ required: true }) set data(values: any[]) {
    const map = new Map<number, any>();

    values.forEach((plan) => {
      plan.items.forEach((item: any) => {
        const { users: itemUser } = item;
        if (itemUser) {
          if (!map.has(itemUser.id)) {
            map.set(itemUser.id, {
              ...itemUser,
              itemCount: 0,
              subitemCount: 0,
            });
          }
          map.get(itemUser.id)!.itemCount++;
        }

        item.subitems?.forEach((sub: any) => {
          const { users: subUser } = sub;
          if (subUser) {
            if (!map.has(subUser.id)) {
              map.set(subUser.id, {
                ...subUser,
                itemCount: 0,
                subitemCount: 0,
              });
            }
            map.get(subUser.id)!.subitemCount++;
          }
        });
      });
    });

    this.collaborators.set(Array.from(map.values()));
  };

  collaborators = signal<any[]>([]);

}
