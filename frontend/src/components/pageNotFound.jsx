import React from 'react';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">{t('hexletChat')}</a>
            </div>
          </nav>
          <div className="text-center">
            <img alt={t('errors.page_not_found')} className="img-fluid h-25" src="404.svg" />
            <h1 className="h4 text-muted">{t('errors.page_not_found')}</h1>
            <p className="text-muted">
              {t('go_over')}
              <a href="/">
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
