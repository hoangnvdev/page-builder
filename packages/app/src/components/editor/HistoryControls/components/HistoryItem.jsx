import {
  CornerUpLeft,
  CornerUpRight,
} from 'lucide-react';
import PropTypes from 'prop-types';

export const HistoryItem = ({ label, type }) => {
  const icon =
    type === "future" ? (
      <CornerUpRight size={12} />
    ) : (
      <CornerUpLeft size={12} />
    );
  const itemClass = `history-controls__item history-controls__item--${type}`;

  return (
    <div className={itemClass}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

HistoryItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["past", "future"]).isRequired,
};
