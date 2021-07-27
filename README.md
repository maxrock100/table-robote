# Getting Started with Application

## Available Scripts to Run

In the project directory, you need to run these two commands

### `yarn install`
It will install the project dependencies
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

Project is mainly four js files.their are css files as well of same name for styling purpose.

### 'app.js'

This is a stateful component, which drives all the application state and responsible for rendering and command execution.

### 'robot.js'

This is a stateless component with the responsibility of rendering the Robot.

### 'controls.js'

This file is again a stateless component with responsibilty of rendering command options.


### 'constants.js'

This file is a single place for all the application related constants.

## Application Controls

We can run multiple commands on our robot and the commands are.

### Place Robot

This command will place our robot in the table when x and y positions are valid. 
There is option to input x and y positions along with selecting the direction.
There will be validations for providing the right input values.
There will be an error message if the position is out of the table and the robot will not move.
In case of successful placement a success message will be displayed

### Reset Robot

This Command will move robot to initial position with default direction.

### Report Robot

This command will display the current position and direction of robot in form of info message.

### Move Robot

This command will move robot will move by one unit in direction of its facing unless positiona are invalid.

### Move Left

This command will change the facing of robot anti clockwise or left.

### Move Right

This command will change the facing of robot clockwise or right.

## Approach

It involves following steps.
1. Render Table, Robot and Controls.
2. Make Robot position absolute on second layer
3. Identify the coordinates of position block and than the cordinates of its center.
4. Place the Robot in the center position using coordinates fetched in last step.
5. we used react effect depending on robots position on table and when  it changes we trigger the third step to move the robot.

## Improvements

We can improve the application in big way by implementing lots of different things
1. We can certailnly improve the design to make it more user friendly.
2. We can add unit testing and behaviour testing to make solution more robust.
3. Right now we are using certain assumption about the size of the table and starting position but we can make it configurable.
4. Transitions can improve.
