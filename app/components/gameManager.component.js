import React, { Component, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { GameEngine } from 'react-native-game-engine';

import GameLoop from '../common/gameLoop';
import Constants from '../common/constants';
import { randomBetween } from '../common/helpers';

import Head from '../components/entities/head/head.component';
import Food from '../components/entities/food/food.component';
import Tail from '../components/entities/tail/tail.component';




import styles from './gameManager.style';

function GameManagerComponent(props) {

    const [boardSize, setBoardSize] = useState(Constants.GRID_SIZE * Constants.CELL_SIZE);
    const [state, setState] = useState({ running: true });
    const engine = useRef();


    const _displayGame = () => {

        const startEntities = {
            head: {
                position: { x: 0, y: 0 },
                speed: { x: 1, y: 0 },
                frame: Constants.FREQUENCY,
                size: Constants.CELL_SIZE,
                renderer: <Head {...props} />
            },
            food: {
                position: { x: randomBetween(1, Constants.GRID_SIZE - 1), y: randomBetween(1, Constants.GRID_SIZE - 1) },
                size: Constants.CELL_SIZE,
                renderer: <Food {...props} />
            },
            tail: {
                size: Constants.CELL_SIZE,
                elements: [],
                renderer: <Tail {...props} />
            }
        };

        const _handleMove = (moveType) => {
            console.log(moveType);
            engine.current.dispatch({ type: moveType });

        }

        const _handleEvent = (event) => {
            if (event.type === Constants.EVENTS.GAME_OVER) {
                Alert.alert(
                    'Game over !',
                    'you can start a new game',
                    [
                        {
                            text: 'Restart',
                            onPress: () => {
                                _restart();
                            }
                        }
                    ]
                );
                setState({ running: false })
            }
        }

        const _restart = () => {
            engine.current.swap(startEntities);
            setState({running: true});
        }

        return (
            <View style={styles.container}>
                <GameEngine
                    ref={engine}
                    style={{ width: boardSize, height: boardSize, flex: null, backgroundColor: '#FFF' }}
                    entities={startEntities}
                    systems={[GameLoop]}
                    onEvent={_handleEvent}
                    running={state.running}
                />
                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        {/* top */}
                        <TouchableOpacity onPress={() => _handleMove(Constants.EVENTS.TOP)}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        {/* left */}
                        <TouchableOpacity onPress={() => _handleMove(Constants.EVENTS.LEFT)}>
                            <View style={styles.control} />
                        </TouchableOpacity>

                        <View style={[styles.control, { backgroundColor: null }]} />
                        {/* Right */}
                        <TouchableOpacity onPress={() => _handleMove(Constants.EVENTS.RIGHT)}>
                            <View style={styles.control} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.controlRow}>
                        {/* Bottom */}
                        <TouchableOpacity onPress={() => _handleMove(Constants.EVENTS.BOTTOM)}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return _displayGame();
}

export default GameManagerComponent;