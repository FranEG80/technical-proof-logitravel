import { useState } from 'react';
import styled from 'styled-components';
import { AddItemModal } from './components/organisms/AddItemModal';
import { ListSection } from './components/organisms/ListSection';

const AppLayout = styled.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blueMedium} 0%, ${({ theme }) => theme.colors.blueLight} 100%);


  @media (max-width: 768px) {
    padding: 0px;
  }
`;

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddModalClosing, setIsAddModalClosing] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    setIsAddModalClosing(false);
  };

  const handleRequestCloseAddModal = () => {
    setIsAddModalClosing(true);
  };

  const handleAddModalAnimationEnd = () => {
    if (!isAddModalClosing) {
      return;
    }

    setIsAddModalOpen(false);
    setIsAddModalClosing(false);
  };

  return (
    <AppLayout>
      {isAddModalOpen && (
        <AddItemModal
          isClosing={isAddModalClosing}
          onRequestClose={handleRequestCloseAddModal}
          onCloseAnimationEnd={handleAddModalAnimationEnd}
        />
      )}
      <ListSection onAddClick={handleOpenAddModal} />
    </AppLayout>
  );
}

export default App;
