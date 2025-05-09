import cn from 'classnames'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import { selectors as channelsSelectors } from '../slices/channelsSlice.js'
import { openModal, setCurrentChannelId } from '../slices/modalSlice.js'

const ChannelsBox = () => {
  const dispatch = useDispatch()
  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.ui.currentChannelId)
  const showModal = type => dispatch(openModal(type))
  const { t } = useTranslation()

  const renderButton = (ch) => {
    const button = ch.map((channel) => {
      if (channel.removable === false) {
        return (
          <li key={channel.id} className="nav-item w-100">
            <button onClick={() => dispatch(setCurrentChannelId(channel.id))} type="button" className={cn('w-100', 'rounded-0', 'text-start', 'btn', channel.id === currentChannelId ? 'btn-secondary' : null)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        )
      }
      return (
        <li key={channel.id} className="nav-item w-100">
          <Dropdown onClick={() => dispatch(setCurrentChannelId(channel.id))} as={ButtonGroup} className="d-flex show">
            <Button className="w-100 rounded-0 text-start text-truncate" variant={channel.id === currentChannelId ? 'secondary' : null}>
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split variant={channel.id === currentChannelId ? 'secondary' : null} id="dropdown-split-basic">
              <span className="visually-hidden">{t('menu')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => showModal('removing')}>{t('delete')}</Dropdown.Item>
              <Dropdown.Item onClick={() => showModal('renaming')}>{t('rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      )
    })
    return button
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button type="button" onClick={() => showModal('adding')} className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {renderButton(channels)}
      </ul>
    </div>
  )
}

export default ChannelsBox
