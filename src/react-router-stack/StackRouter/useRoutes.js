import { Children, useMemo } from 'react';
import { StackRoute } from '../StackRoute/StackRoute';

export function routesByChildren(children) {
  return Children.toArray(children)
    .map((child: any) => (child.type === StackRoute ? child : null))
    .filter(route => !!route);
}

export function useRoutes(children) {
  return useMemo(() => routesByChildren(children), [children]);
}
