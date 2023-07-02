import { createContext } from 'react';
import { Dispatch, State } from './AccountContext.types';
import { IRegionTariffs } from '@/components/Account/AccountBuyContent/interfaces';
import { initialState } from './initialState';

export const AccountStateContext = createContext<{
  state: State;
  dispatch: Dispatch;
  isPopupHide: boolean;
  popupHide: (s: boolean) => void;
}>(initialState);
