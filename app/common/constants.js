import { Dimensions } from 'react-native';

const Constants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 15,
    CELL_SIZE: 20,
    FREQUENCY: 10,
    EVENTS: {
        TOP: 'top',
        RIGHT: 'right',
        LEFT: 'left',
        BOTTOM: 'bottom',
        GAME_OVER: 'gameOver'
    }
}

export default Constants;