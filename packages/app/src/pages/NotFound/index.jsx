import './index.scss';

import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/template");
  };

  // Split description into sentences
  const description = t("notFound.description");
  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);

  return (
    <div className="not-found">
      <div className="not-found__content">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">{t("notFound.title")}</h1>
        <div className="not-found__description">
          {sentences.map((sentence, index) => (
            <p key={index}>{sentence}</p>
          ))}
        </div>
        <button className="not-found__button" onClick={handleGoHome}>
          <Home size={20} />
          <span>{t("notFound.goHome")}</span>
        </button>
      </div>
    </div>
  );
};
