import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal:
    {
      isOpened: false,
      type: null,
    },
  currentChannelId: '1',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.modal.isOpened = true
      state.modal.type = payload
    },
    closeModal: (state) => {
      state.modal.isOpened = false
      state.modal.type = null
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload
    },
  },
})

export const { openModal, closeModal, setCurrentChannelId } = uiSlice.actions
export default uiSlice.reducer
