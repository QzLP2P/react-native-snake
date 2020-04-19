import React, { Component } from "react";
import Constants from './constants';
import { randomBetween, positionComparer } from "./helpers";

const GameLoop = (entities, { touches, dispatch, events }) => {
    let { head, food, tail } = entities;



    const _handleHead = () => {
        head.frame -= 1;
        // We can move...
        if (head.frame === 0) {

            //Check move accessibility
            const _checkNextMoveAvaibality = () => {
                let isOk = true;
                const left = head.position.x + head.speed.x < 0;
                const right = head.position.x + head.speed.x >= Constants.GRID_SIZE;
                const top = head.position.y + head.speed.y < 0;
                const bottom = head.position.y + head.speed.y >= Constants.GRID_SIZE;

                isOk = !(left || right || top || bottom);
                return isOk;
            }

            if (!_checkNextMoveAvaibality()) {
                // game over
                dispatch({ type: Constants.EVENTS.GAME_OVER })
            } else {
                // move tails
                tail.elements = [{ position: { x: head.position.x, y: head.position.y } }].concat(tail.elements).slice(0, -1);

                // update head position
                head.position.x += head.speed.x
                head.position.y += head.speed.y

                const _handleEatMySelf = () => {
                    tail.elements.forEach(body => {
                        if(positionComparer(body.position, head.position)){
                            dispatch({type: Constants.EVENTS.GAME_OVER});
                        }
                    })
                }

                _handleEatMySelf();
            }

            // On reset
            head.frame = Constants.FREQUENCY;
        }
    }

    const _handleEvents = () => {
        if (!!events?.length) {
            console.log('handling events');
            events.forEach(e => {
                head.speed.x = 0;
                head.speed.y = 0;


                head.speed.y = e.type === Constants.EVENTS.TOP && head.speed.y !== 1 ? -1 : head.speed.y;
                head.speed.y = e.type === Constants.EVENTS.BOTTOM && head.speed.y !== -1 ? 1 : head.speed.y;


                head.speed.x = e.type === Constants.EVENTS.LEFT && head.speed.y !== 1 ? -1 : head.speed.x;
                head.speed.x = e.type === Constants.EVENTS.RIGHT && head.speed.y !== -1 ? 1 : head.speed.x;
            });
        }
    }

    const _handleFood = () => {
        if (positionComparer(head.position, food.position)) {
            // Eat the food
            tail.elements = [{ position: { x: food.position.x, y: food.position.y } }].concat(tail.elements);
            // Add new food
            const _updateFoodPosition = () => {
                food.position.x = randomBetween(0, Constants.GRID_SIZE - 1);
                food.position.y = randomBetween(0, Constants.GRID_SIZE - 1);
            }
            _updateFoodPosition();
        }
    }

   

    _handleEvents();
    _handleHead();
    _handleFood();


    return entities;
};

export default GameLoop;