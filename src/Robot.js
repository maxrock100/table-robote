import PropTypes from 'prop-types';

import RobotImage from './robot.svg'
import RobotDirection from './direction.svg'

import './Robot.css';

const Robot = ({direction}) => {
    return(
        <div className='robot'>
            <img className={`robot__direction robot__direction--${direction.toLowerCase()}`} src={RobotDirection}/>
            <img className='robot__body' src={RobotImage}/>
        </div>    
    )
}

Robot.propTypes = {
    direction: PropTypes.string
  };

Robot.defaultProps = {
    direction: 'north'
};

export default Robot;
