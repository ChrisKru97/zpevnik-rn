export type Song = {
  id: string;
  checkRequired: boolean;
  name: string;
  number: number;
  withChords: string;
  withoutChords: string;
};

export type StackParamList = {
  Home: undefined;
  History: undefined;
  Favorites: undefined;
  Song: undefined;
  Edit: undefined;
  Account: undefined;
};

export enum ModalType {
  search,
  numberInput,
  settings,
}
