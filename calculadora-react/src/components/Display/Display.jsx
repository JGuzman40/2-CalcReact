import PropTypes from 'prop-types';
import './Display.scss';

function Display({ value }) {
  return (
    <div className="display">
      {value}
    </div>
  );
}

Display.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Display;

