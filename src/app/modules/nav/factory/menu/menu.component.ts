import { Component } from '@angular/core';
import { MenuUiComponent } from '../../ui/menu-ui/menu-ui.component';

export interface Module {
  path: string;
  title: string;
  icon: string;
  state: string;
  colorDefault?: string;
  isCurrentRoute: boolean;
}

export const modules: Module[] = [
  {
    path: 'home',
    title: 'Inicio',
    icon: 'Home.svg',
    state: 'activated',
    colorDefault: '#546de5',
    isCurrentRoute: true,
  },
  {
    path: 'projects',
    title: 'Projetos',
    icon: 'Dashboard.svg',
    state: 'activated',
    colorDefault: '#303952',
    isCurrentRoute: false,
  },
  {
    path: 'action-plan',
    title: 'Plano de Ação',
    icon: 'API.svg',
    state: 'activated',
    colorDefault: '#e15f41',
    isCurrentRoute: false,
  },
  {
    path: 'validation',
    title: 'Validação',
    icon: 'Bolt swich.svg',
    state: 'inactivated',
    colorDefault: '#e15f41',
    isCurrentRoute: false,
  },
  {
    path: 'approval-flow',
    title: 'Fluxo de Aprovação',
    icon: 'Upgrade.svg',
    state: 'activated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
  {
    path: 'finance',
    title: 'Financeiro',
    icon: 'Change.svg',
    state: 'inactivated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
  {
    path: 'config',
    title: 'Configuração',
    icon: 'Settings.svg',
    state: 'inactivated',
    isCurrentRoute: false,
  },
];

export const adminModules: Module[] = [
  {
    path: 'clients',
    title: 'Clientes',
    icon: 'Person.svg',
    state: 'activated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
  {
    path: 'collaborator',
    title: 'Colaboradores',
    icon: 'Invite.svg',
    state: 'activated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
  {
    path: 'roles',
    title: 'Equipes',
    icon: 'Guest.svg',
    state: 'activated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
  {
    path: 'status',
    title: 'Status',
    icon: 'Labs.svg',
    state: 'activated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
  {
    path: 'action-plan/status',
    title: 'Status do Plano de Ação',
    icon: 'Labs.svg',
    state: 'activated',
    colorDefault: '#574b90',
    isCurrentRoute: false,
  },
];

@Component({
  selector: 'menu',
  standalone: true,
  imports: [MenuUiComponent],
  template: `<menu-ui
    [modules]="modules"
    [adminModules]="adminModules"
  ></menu-ui>`,
})
export class MenuComponent {
  modules: Module[] = modules;
  adminModules: Module[] = adminModules;
}
