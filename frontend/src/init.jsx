import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import i18next from 'i18next'
import filter from 'leo-profanity'
import { StrictMode } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import * as yup from 'yup'

import AuthProvider from './components/authProvider.jsx'
import Chat from './components/chat.jsx'
import ChatRoute from './components/chatRoute.jsx'
import MainPage from './components/mainPage.jsx'
import PageNotFound from './components/pageNotFound.jsx'
import Signup from './components/signup.jsx'
import Socket from './components/socket.jsx'
import resources from './locales/index.js'
import routes from './routes.js'
import store from './slices/index.js'

const init = async () => {
  filter.add(filter.getDictionary('ru'))
  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      debug: true,
    })

  yup.setLocale({
    mixed: {
      required: () => i18n.t('errors.required'),
      oneOf: () => i18n.t('errors.notMatchPassword'),
      notOneOf: () => i18n.t('errors.uniq'),
    },
    string: {
      min: ({ min }) => i18n.t('errors.string_min', { min }),
      max: ({ max }) => i18n.t('errors.string_max', { max }),
    },
  })

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.MODE,
  }

  return (
    <StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <Provider store={store}>
                <Socket>
                  <BrowserRouter>
                    <Routes>
                      <Route path={routes.notFound} element={<PageNotFound />} />
                      <Route path={routes.mainPage} element={<MainPage />} />
                      <Route path={routes.signupPage} element={<Signup />} />
                      <Route
                        path={routes.chatPage}
                        element={(
                          <ChatRoute>
                            <Chat />
                          </ChatRoute>
                        )}
                      />
                    </Routes>
                    <ToastContainer />
                  </BrowserRouter>
                </Socket>
              </Provider>
            </AuthProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>
  )
}

export default init
