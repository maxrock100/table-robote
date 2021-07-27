import { useEffect, useState, useRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { initialPosition, directionVariance, directionOrder, xSeries, ySeries } from './constants'
import Controls from './Controls'
import Robot from './Robot'

import './App.css';

const App = () => {

/**
 * This is for initial robot position
 * It will get the initial position from constants
*/

  const defaultRobotPosition = {
    xPos : initialPosition.xPos,
    yPos : initialPosition.yPos,
    direction: 'NORTH'
  }

/**
 * this is for setting the info message
*/

  const [infoMessage, setInfoMessage] = useState({open: false,severity:'', message:''})

/**
 * This is for setting the robot position
*/

  const [robotPosition, setRobotPosition] = useState(defaultRobotPosition)
  
/**
 * This is for setting the initial dimension of vieport, it will help at time of resizing
*/

  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

/**
 * This will give dom ref
*/

  const gridRef = useRef(null);

/**
 * Validate the robot position
 * It will trigger error message if position is out of table
 *
 * @param  {object} position        x position, y position
 * 
 * @return {boolean} It will return true or false
*/

  const validateRobotPosition = ({xPos, yPos}) => {
     if(xSeries.includes(parseInt(xPos)) && ySeries.includes(parseInt(yPos))) {
        return true
      } else {
        const severity = 'error';
        const message = 'Robot can not move as location is out of table'
        showInfoMessage({severity, message})
        return false;
      }
  }

/**
 * it will place the robot in giving position
 *
 * @param  {object} position        x position, y position, direction
 * 
*/

  const placeRobot = (robotPosition) => {
    validateRobotPosition(robotPosition) && setRobotPosition(robotPosition)
  }

/**
 * it will reset the robot to initial position
*/

  const resetRobot = () => {
    const severity = 'success';
    const message = `Robot moved to initial position`
    setRobotPosition(defaultRobotPosition)
    showInfoMessage({severity, message})
  }

/**
 * it will show info message
 *
 * @param  {object} messageObject      message severity
 * 
*/

  const showInfoMessage = ({severity, message}) => {
    const open = true
    setInfoMessage({open, severity, message})
  }

/**
 * it will handle the message close trigger 
*/

  const closeInfoMessage = () => {
    const open = false
    setInfoMessage({...infoMessage, open})
  }

/**
 * it will report the robot positions using show message 
*/

  const reportRobot = () => {
    const {xPos, yPos, direction} = robotPosition;
    const severity = 'info';
    const message = `Robot is at ${xPos},${yPos} position and Direction is ${direction}`
    showInfoMessage({severity, message})
  }

/**
 * it will  move the robot by 1 position in its facing direction 
 * it will also show the error message in case of invalid position on table
*/

  const moveRobot = () => {
    const {direction, xPos:currentXPos, yPos:currentYPos} = robotPosition;
    const variance = directionVariance[direction.toLowerCase()]
    const xPos = parseInt(currentXPos) + variance.xDelta
    const yPos = parseInt(currentYPos) + variance.yDelta
    const position = {...robotPosition, xPos, yPos}
    const severity = 'success';
    const message = `Robot moved successfully`
    if(validateRobotPosition(position)){
      setRobotPosition(position)
      showInfoMessage({severity, message})
    }
  }

/**
 * it will move robot in left and right direction
 *
 * @param  {boolean} rotation       
 * 
*/

  const moveInClockDirection = (rotateClockWise) => {
    return () => {
    const {direction: currentDirection} = robotPosition;
    const index = directionOrder.findIndex((direction) => direction.toLowerCase() === currentDirection.toLowerCase() )
    const nextDirectionIndex = rotateClockWise ? (index === 0 ? directionOrder.length-1 : index -1 ) : ( index === directionOrder.length-1 ? 0 : index + 1 )
    const direction = directionOrder[nextDirectionIndex];
    const position = {...robotPosition, direction}
    const severity = 'success';
    const message = `Robot moved ${rotateClockWise?'right':'left'} successfully`
    if(validateRobotPosition(position)){
      setRobotPosition(position)
      showInfoMessage({severity, message})
    }
  }
  }

/**
 * it is the object we will pass as props to controls component
*/

  const controlProps = {
    placeRobot,
    resetRobot,
    showInfoMessage,
    reportRobot,
    moveRobot,
    moveLeft: moveInClockDirection(false),
    moveRight: moveInClockDirection(true)
  }

/**
 * this effect will trigger the re render and reposition in case of resize event 
*/

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
}

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
}
})

/**
 * it will be responsible to get the coordinates of block according th given position
 * It will also set the robot position to the center of block
 * it will trigger on change in position or resizing of window
*/

  useEffect(()=>{
    const blockSelector = `#block-${robotPosition.xPos}${robotPosition.yPos}`
    const blockElement = gridRef.current.querySelector(blockSelector);
    const robotElement = gridRef.current.querySelector('.robot');
    if(blockElement) {
      const blockPosition = blockElement.getBoundingClientRect()
      robotElement.style.top = `${blockPosition.top + window.scrollY + blockElement.clientHeight/2}px`
      robotElement.style.left = `${blockPosition.left + window.scrollX+ blockElement.clientWidth/2}px`
    }
  },[robotPosition, dimensions])

  return (
    <div className='main'>
    <div className='grid' ref={gridRef}>
      {
        xSeries.map(xPos => {
          return (
          <div>
            {ySeries.map(yPos => 
              {
                const blockPositionSelector = `block-${xPos}${yPos}`
                return <div id={blockPositionSelector} key={`${xPos}_${yPos}`} className='content-block' />
              })}
          </div>
          )
        })
      }
      <Robot direction={robotPosition.direction}/>
    </div>
      <Controls {...controlProps}/>
      <Snackbar
        open={infoMessage.open}
        autoHideDuration={3000}
        onClose={closeInfoMessage}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={closeInfoMessage} severity={infoMessage.severity}>
          {infoMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
}


export default App;
