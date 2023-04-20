import { ComponentType, ReactNode } from 'react';
import { SvgIconProps } from '@mui/material';

import { AccessRestriction } from '../utils/auth';
import { AllowedFor } from '../utils/auth';

interface BaseRouteConfigurationModel extends AccessRestriction {
  link?: string;
  path?: string;
  title: () => string;
  component?: ReactNode;
}

export interface RouteChildrenConfigurationModel extends Required<BaseRouteConfigurationModel> {}

export interface RouteConfigurationModel extends BaseRouteConfigurationModel {
  icon: ComponentType<SvgIconProps>;
  children?: RouteChildrenConfigurationModel[];
  key?: string;
  allowedFor?: AllowedFor;
}
