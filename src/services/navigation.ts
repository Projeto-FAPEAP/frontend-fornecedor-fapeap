import React from 'react';

import {
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

interface INavigationTopLevelData {
  navigate(name: string, params: ParamListBase): void;
}

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: ParamListBase): void {
  navigationRef.current?.navigate(name, params);
}

export function navigateNoParams(name: string): void {
  navigationRef.current?.navigate(name);
}

export function useNavigationTopLevel(): INavigationTopLevelData {
  return {
    navigate,
  };
}
