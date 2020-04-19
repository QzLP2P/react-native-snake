import React, { Component, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import styles from './tail.style';
import Constants from '../../../common/constants';

function TailComponent(props) {

    const { size, elements } = props;

    const _render = () => {

        const _renderItem = (item, index) => {
            const { x, y } = item.position;
            return (
                <View
                    key={index}
                    style={[styles.container, {
                        width: size,
                        height: size,
                        left: x * size,
                        top: y * size
                    }]}>
                </View>
            )
        }

        const tails = elements.map((e, index) => _renderItem(e, index));
        return (
            <View style={{ width: size * Constants.GRID_SIZE, height: size * Constants.GRID_SIZE}}>
                {tails}
            </View>
        )
    }

    return _render();

}

export default TailComponent;