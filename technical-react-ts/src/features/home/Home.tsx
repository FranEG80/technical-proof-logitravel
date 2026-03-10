import { useMemo } from 'react';
import { HomeLayout } from './components/atom';
import AddItemModal from '@/features/add-item';
import ListSection from '@/features/list-items';
import useHome from './hooks';
import {
  getDraft,
  getHistory,
  getIsModalOpen,
  getIsModalVisible,
  getItems
} from './model';

function Home() {
  const { state, actions } = useHome();
  const isModalOpen = getIsModalOpen(state);
  const isModalVisible = getIsModalVisible(state);
  const draft = getDraft(state);
  const items = getItems(state);
  const hasHistory = getHistory(state);

  const listSectionMemoized = useMemo(
    () => (
      <ListSection
        items={items}
        onAddClick={actions.openModal}
        onSelectItem={actions.selectItem}
        onDelete={actions.deleteSelected}
        onUndo={actions.undo}
        isHistoryEmpty={!hasHistory.length}
      />
    ), [items, actions.openModal, actions.selectItem, actions.deleteSelected, actions.undo, hasHistory],
  );

  return (
    <HomeLayout>
      {isModalVisible && (
        <AddItemModal
          isOpen={isModalOpen}
          draft={draft}
          onDraftChange={actions.handleDraft}
          onConfirm={actions.addItem}
          onRequestClose={actions.closeModal}
          onCloseAnimationEnd={actions.handleModalAnimationEnd}
        />
      )}
      {listSectionMemoized}
    </HomeLayout>
  );
}

export default Home;
