import React, { Component, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import styles from './food.style';

function FoodComponent(props) {

    const {size } = props;
    const {x, y} = props.position;

    const _render = () => {
        return (
        <View style={[ styles.container, {
            width: size,
            height: size,
            left: x * size,
            top: y * size
            }]}>
        </View>
        );
    }

    return _render();

}

export default FoodComponent;