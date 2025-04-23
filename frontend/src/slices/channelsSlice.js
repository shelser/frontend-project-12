import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: '1', modalInfo: { type: null } });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setModalInfo: (state, { payload }) => {
      state.modalInfo = payload;
    },
  },
});

export const selectChannelId = createSelector(
  [state => state.channels],
  state => state.currentChannelId,
);
export const getModalInfo = createSelector(
  [state => state.channels],
  state => state.modalInfo,
);
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors(state => state.channels);
export default channelsSlice.reducer;
