var util = require('util');

var TABLE_SIZE = 5;
var Commands = ['PLACE', 'MOVE', 'REPORT', 'LEFT', 'RIGHT'];
var Directions = ['EAST', 'WEST', 'NORTH', 'SOUTH'];
var currentPositionX = null;
var currentPositionY = null;
var currentDirection = null;
var isRobotPlaced = false;

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('../BauerMedia/RobotInput.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function (command) {
    //Ignore Blank lines
    if (command.length > 1)
        processRobot(command.toUpperCase().trim());
});

var processRobot = function (command) {
    if (command.indexOf("PLACE") > -1) {
        var placeargs = command.split(' ')[1].trim();
        var position = placeargs.split(',');
        if (position && position.length > 2) {
            PlaceRobot(parseInt(position[0].trim(), 10), parseInt(position[1].trim(), 10), position[2].trim());
        }
        else {
            console.log('Invalid arguments');
        }
    }
    else {
        switch (command) {
            case 'MOVE':
                return moveRobot();
            case 'LEFT':
                return turnLeft();
            case 'RIGHT':
                return turnRight();
            case 'REPORT':
                return reportRobot();
            default:
                console.log('Unknown command ' + command);
                return false;
        }
    }
};

function PlaceRobot(x, y, Direction) {
    if (Directions.indexOf(Direction) > -1) {
        //Valid Direction
        if (isCoordinateValid(x) && isCoordinateValid(y)) {
            currentPositionX = x;
            currentPositionY = y;
            currentDirection = Direction;
            isRobotPlaced = true;
        }
        else {
            console.log('Invalid Place command Arguments');
        }
    }
    else {
        console.log('Please Provide Valid Direction.');
    }
}

function moveRobot() {
    if (isRobotPlaced) {
        var newPosition = {
            x: currentPositionX,
            y: currentPositionY,
        };
        
        switch (currentDirection) {
            case 'NORTH':
                newPosition.y++;
                break;
            case 'SOUTH':
                newPosition.y--;
                break;
            case 'EAST':
                newPosition.x++;
                break;
            case 'WEST':
                newPosition.x--;
                break;
        }
        if (isCoordinateValid(newPosition.x) && isCoordinateValid(newPosition.y)) {
            currentPositionX = newPosition.x;
            currentPositionY = newPosition.y;
        }
    }
    else { console.log('Please place the roboton the table'); }
}

function turnLeft() {
    if (isRobotPlaced) {
        switch (currentDirection) {
            case 'NORTH':
                currentDirection = 'EAST';
                break;
            case 'SOUTH':
                currentDirection = 'WEST';
                break;
            case 'EAST':
                currentDirection = 'SOUTH';
                break;
            case 'WEST':
                currentDirection = 'NORTH';
                break;
            default:
                break;
        }
    }
    else { console.log('Please place the roboton the table'); }
}

function turnRight() {
    if (isRobotPlaced) {
        switch (currentDirection) {
            case 'NORTH':
                currentDirection = 'WEST';
                break;
            case 'SOUTH':
                currentDirection = 'EAST';
                break;
            case 'EAST':
                currentDirection = 'NORTH';
                break;
            case 'WEST':
                currentDirection = 'SOUTH';
                break;
            default:
                break;
        }
    }
    else { console.log('Please place the robot on the table'); }
}

function reportRobot() {
    console.log('Output: ' + currentPositionX + ' ' + currentPositionY + ' ' + currentDirection);
}

function isCoordinateValid(axis) {
    if (isNaN(axis)) {
        return false;
    } else if (axis < 0 || axis > TABLE_SIZE) {
        console.log('command places Robot off table.');
        return false;
    } else {
        return true;
    }
}