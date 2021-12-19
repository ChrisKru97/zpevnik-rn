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
  Song: Song;
  Edit: undefined;
  Account: undefined;
};

export enum ModalType {
  search = 'search',
  numberInput = 'numberInput',
  settings = 'settings',
}
