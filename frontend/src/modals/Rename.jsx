import axios from 'axios'
import cn from 'classnames'
import { useFormik } from 'formik'
import filter from 'leo-profanity'
import { useEffect, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import useAuth from '../contexts/useAuth.jsx'
import routes from '../routes.js'
import { actions, selectors as channelsSelectors } from '../slices/channelsSlice.js'
import { closeModal } from '../slices/modalSlice.js'

const Rename = () => {
  const dispatch = useDispatch()
  const currentChannelID = useSelector(state => state.ui.currentChannelId)
  const inputRef = useRef()
  const { t } = useTranslation()
  const nameChannels = Object.values(useSelector(channelsSelectors.selectAll))
    .map(channel => channel.name)
  const auth = useAuth()
  const hideModal = () => dispatch(closeModal())

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().test(
        'length-range',
        t('errors.string_range', { min: 3, max: 20 }),
        val => !val || (val.length >= 3 && val.length <= 20),
      ).notOneOf(nameChannels),
    }),
    onSubmit: async (values) => {
      const editedChannel = { name: filter.clean(values.name) }
      try {
        const res = await axios.patch(`${routes.channelsPath()}/${currentChannelID}`, editedChannel, {
          headers: auth.getAuthHeader(),
        })
        dispatch(actions.renameChannel({ id: res.data.id, changes: res.data }))
        toast.success(t('renamed'))
        hideModal()
      }
      catch (error) {
        toast.error(t('errors.error_network'))
        throw error
      }
    },
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Modal onHide={hideModal} show container={document.body} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('rename_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              name="name"
              className={cn('mb-2', formik.errors.name ? 'is-invalid' : null)}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Label htmlFor="name" className="visually-hidden">{t('channelName')}</Form.Label>
            { formik.errors.name ? (<div className="invalid-feedback">{formik.errors.name}</div>) : null}
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>{t('cancel')}</Button>
              <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>{t('submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Rename
