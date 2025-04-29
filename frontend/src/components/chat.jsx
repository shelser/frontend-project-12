import axios from 'axios'
import { useEffect } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import useAuth from '../contexts/useAuth.jsx'
import Modal from '../modals/Modals.jsx'
import routes from '../routes.js'
import { actions as channelsAction } from '../slices/channelsSlice.js'
import { actions as messagesAction } from '../slices/messagesSlice.js'

import ChannelsBox from './channelsBox.jsx'
import MessageBox from './messageBox.jsx'

const Chat = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const auth = useAuth()

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const [channelsResponse, messagesResponse] = await Promise.all([
          axios.get(routes.channelsPath(), { headers: auth.getAuthHeader() }),
          axios.get(routes.messagesPath(), { headers: auth.getAuthHeader() }),
        ])

        dispatch(channelsAction.addChannels(channelsResponse.data))
        dispatch(messagesAction.addMessages(messagesResponse.data))
      }
      catch (error) {
        toast.error(t('errors.error_network'))
        throw error
      }
    }
    fetchChat()
  }, [auth, dispatch, t])

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to={routes.chatPage}>{t('hexletChat')}</Navbar.Brand>
            <Button as={Link} to={routes.mainPage} state={{ from: location }} onClick={auth.logOut}>{t('logout')}</Button>
          </div>
        </Navbar>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessageBox />
          </div>
        </div>
      </div>
      <Modal />
    </>
  )
}

export default Chat
