import { RouteConfigurationModel } from '../models';
import { Role } from '../config/roles';

export type AllowedFor = Role[] | Role;

export interface AccessRestriction {
  allowedFor?: AllowedFor;
}

export const hasPermission = (role?: Role, allowedFor?: AllowedFor) => {
  if (!allowedFor) {
    return true;
  }

  if (!role) {
    return false;
  }

  if (Array.isArray(allowedFor)) {
    return allowedFor.includes(role);
  }

  return allowedFor === role;
};

export const filterRoutes = (routes: RouteConfigurationModel[], role?: Role) => {
  if (!Array.isArray(routes)) {
    return [];
  }

  return routes.reduce((filtered, current) => {
    if (hasPermission(role, current.allowedFor)) {
      filtered.push({
        ...current,
        children: current.children ? current.children.filter((route) => hasPermission(role, route.allowedFor)) : [],
      } as RouteConfigurationModel);
    }

    return filtered;
  }, [] as RouteConfigurationModel[]);
};
