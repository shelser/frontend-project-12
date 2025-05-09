import axios from 'axios'
import { useFormik } from 'formik'
import filter from 'leo-profanity'
import { Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import useAuth from '../contexts/useAuth.jsx'
import routes from '../routes.js'
import { selectors } from '../slices/channelsSlice.js'
import { actions, selectors as messagesSelectors } from '../slices/messagesSlice.js'

const MessageBox = () => {
  const allMessage = useSelector(messagesSelectors.selectEntities)
  const currentChannelID = useSelector(state => state.ui.currentChannelId)
  const currentChannelName = useSelector(state => selectors.selectById(state, currentChannelID))
  const messageCount = Object.values(allMessage)
    .filter(message => message.channelId === currentChannelID)
  const userId = JSON.parse(localStorage.getItem('userId'))
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const auth = useAuth()

  const getCurrentMessages = (messages, channelID) => {
    const currentMessages = Object.values(messages)
      .filter(message => message.channelId === channelID)
    if (messages.length === 0) {
      return null
    }
    return (
      currentMessages.map(message => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))
    )
  }

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const newMessage = {
        body: filter.clean(values.body),
        channelId: currentChannelID,
        username: userId.username,
      }
      try {
        const res = await axios.post(routes.messagesPath(), newMessage, {
          headers: auth.getAuthHeader(),
        })
        dispatch(actions.addMessage(res.data))
        resetForm()
      }
      catch (error) {
        toast.error(t('errors.error_network'))
        throw error
      }
    },
  })

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannelName?.name}
            </b>
          </p>
          <span className="text-muted">{t('messageCount', { count: messageCount.length })}</span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
          {getCurrentMessages(allMessage, currentChannelID)}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup hasValidation>
              <Form.Control
                name="body"
                aria-label={t('newMessage')}
                placeholder={t('enter_message')}
                className="border-0 ps-2 p-0"
                value={formik.values.body}
                onChange={formik.handleChange}
              />
              <button type="submit" className="btn btn-group-vertical" disabled="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
                <span className="visually-hidden">{t('submit')}</span>
              </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
