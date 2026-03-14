import { HomeLayout } from './components/atom';
import AddItemModal from '@/features/add-item';
import ListSection from '@/features/list-items';
import useHome from './hooks';
import {
  getHistory,
  getIsModalOpen,
  getIsModalVisible,
  getItems
} from './model';

function Home() {
  const { state, actions } = useHome();
  const isModalOpen = getIsModalOpen(state);
  const isModalVisible = getIsModalVisible(state);
  const items = getItems(state);
  const hasHistory = getHistory(state);

  return (
    <HomeLayout>
      {isModalVisible && (
        <AddItemModal
          isOpen={isModalOpen}
          onConfirm={actions.addItem}
          onRequestClose={actions.closeModal}
          onCloseAnimationEnd={actions.handleModalAnimationEnd}
        />
      )}
      <ListSection
        items={items}
        onAddClick={actions.openModal}
        onSelectItem={actions.selectItem}
        onDelete={actions.deleteSelected}
        onUndo={actions.undo}
        isHistoryEmpty={!hasHistory.length}
      />
    </HomeLayout>
  );
}

export default Home;
