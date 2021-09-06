import { useContext } from 'react';
import { __RouterContext } from 'react-router';

export function useLink() {
  return useContext(__RouterContext).link;
}
