import { useState } from 'react';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

import { directions } from './constants';

import './Controls.css';

const Controls = ({placeRobot, resetRobot, showInfoMessage, reportRobot, moveRobot, moveLeft, moveRight}) => {
    
    /**
     * This is for initial input parameters for place robot command

    */

    const initialPlaceOptions = {
        xPos: '',
        yPos: '',
        direction: 'north'
    }

    /**
     * This is for input parameters for place robot command

    */
   
    const[placeOptions, setPlaceOptions] = useState(initialPlaceOptions)

    /**
     * This is for handle input  change parameters for place robot command
     * 
     * @param  {object} event
    */
   
    const handlePlaceInputChange = e => {
        const attributeValue = e.target.value
        const attributeName = e.target.getAttribute('id')
        const copyPlaceOptions = {...placeOptions}
        copyPlaceOptions[attributeName] = attributeValue;
        setPlaceOptions(copyPlaceOptions)
    }

    /**
     * This is for handle select change parameters for place robot command
     * 
     * @param  {object} event 
    */
   
    const handlePlaceSelectChange = e => {
    const direction = e.target.value;
    setPlaceOptions({...placeOptions, direction})
    }

    /**
     * This is for initial input parameters for place robot command
     * It will trigger the error message in case of invalid params
     * 
     * @return {boolean} It will return true or false
    */
   
    const validatePlace= () => {
        let message = '';
        const severity = 'error'
        const {xPos, yPos} = placeOptions;
        if('' === xPos ) {
            message = 'please enter x position';
        } else if('' === yPos) {
            message = 'please enter y position';
        } else if(isNaN(xPos) || isNaN(yPos)) {
            message = 'please enter a number'
        } else {
            return true;
        }
        showInfoMessage({severity, message})
        return false;
    }
 return (
     <div>
         <div data-control-name='Place' className='controls__place controls__action'>
            <TextField id='xPos' className='controls__input' defaultValue={placeOptions.xPos} label='x Pos' onChange = { handlePlaceInputChange } variant='outlined' />
            <TextField id='yPos' className='controls__input' defaultValue={placeOptions.yPos} label='y Pos' onChange = { handlePlaceInputChange } variant='outlined' />
            <FormControl className='controls__input' variant='outlined'>
                <InputLabel id="direction-select-label">Direction</InputLabel>
                <Select
                    labelId="direction-select-label"
                    id='direction'
                    value={placeOptions.direction}
                    onChange={handlePlaceSelectChange}
                    size='small'
                >
                {
                    directions.map((direction)=>(<MenuItem key={`key_${direction}`} value={direction}>{direction.toUpperCase()}</MenuItem>))
                }
                </Select>
            </FormControl>
             <Button variant="outlined" onClick = {() => {validatePlace() && placeRobot(placeOptions)}}>Place Robot</Button>
         </div>    
         <div className='controls__action' data-control-name='Reset'>
            <Button variant="outlined" onClick = {resetRobot}>Reset Robot</Button>
        </div>
        <div className='controls__action' data-control-name='Report'>
            <Button variant="outlined" onClick = {reportRobot}>Report Robot</Button>
        </div>
        <div className='controls__action' data-control-name='Move'>
            <Button variant="outlined" onClick = {moveRobot}>Move Robot</Button>
        </div>
        <div className='controls__action' data-control-name='Left'>
            <Button variant="outlined" onClick = {moveLeft}>Move Left</Button>
        </div>
        <div className='controls__action' data-control-name='Right'>
            <Button variant="outlined" onClick = {moveRight}>Move Right</Button>
        </div>
     </div>    
 )   
}

Controls.propTypes = {
    placeRobot: PropTypes.func
};

Controls.defaultProps = {
    placeRobot: ()=>{},
    resetRobot: ()=>{},
    reportRobot: ()=>{},
    moveRobot: ()=>{},
    moveLeft: ()=>{},
    moveRight: ()=>{},
    showInfoMessage: ()=>{}
};

export default Controls