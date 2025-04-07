import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: '1' });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload
    },
  }
});

export const selectChannelId = createSelector(
  [(state) => state.channels],
  (state) => state.currentChannelId
);
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;