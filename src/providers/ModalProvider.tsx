import {createContext, FC, useState} from 'react';
import {NumberInputModal, SearchModal, SettingsModal} from '../components';
import {ModalType} from '../helpers/types';

type ModalContextType = (type?: ModalType) => void;

export const ModalContext = createContext<ModalContextType>(() => null);

const ModalProvider: FC = ({children}) => {
  const [modalOpen, setModalOpen] = useState<ModalType>();

  return (
    <ModalContext.Provider value={setModalOpen}>
      {children}
      <NumberInputModal visible={modalOpen === ModalType.numberInput} />
      <SearchModal visible={modalOpen === ModalType.search} />
      <SettingsModal visible={modalOpen === ModalType.settings} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
