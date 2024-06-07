import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ label, onClick, type }) => {
  return (
    <button className={`button ${type}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};
export default Button;