import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import uiReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    ui: uiReducer,
  },
});
