export interface EnvironmentType {
  production: boolean;
  baseURL: string;
  apiURL: string;
  version: string;
  modules?: EnvironmentModuleType[];
}

export interface EnvironmentModuleType {
  path: string;
  title: string;
  icon: string;
  state: string;
  colorDefault?: string;
}
