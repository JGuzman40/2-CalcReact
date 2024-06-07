import PropTypes from 'prop-types';
import './Button.scss';

function Button({ label, onClick, type = '' }) {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <button className={`button ${type}`} onClick={handleClick}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;

