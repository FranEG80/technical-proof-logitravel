// features/home/model/home.selectors.ts
import type { HomeState } from './home.types';

export const getItems = (state: HomeState) => state.items;
export const getIsModalOpen = (state: HomeState) => state.Modal.isOpen;
export const getIsModalVisible = (state: HomeState) => state.Modal.isOpen || state.Modal.isClosing;
export const getHistory = (state: HomeState) => state.history;
