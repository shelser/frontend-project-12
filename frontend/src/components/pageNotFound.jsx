import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href={routes.chatPage}>{t('hexletChat')}</a>
            </div>
          </nav>
          <div className="text-center">
            <img alt={t('errors.page_not_found')} className="img-fluid h-25" src="404.svg" />
            <h1 className="h4 text-muted">{t('errors.page_not_found')}</h1>
            <p className="text-muted">
              {t('go_over')}
              <a href={routes.chatPage}>
                {t('main_page')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
