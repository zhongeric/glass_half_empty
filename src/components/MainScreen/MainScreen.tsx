import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Part } from '../../types/types';
import { Cup } from '../Cup/cup';
import { Ingredient } from '../ingredient';
import { IngredientList } from '../ingredientList';

import styles from './MainScreen.module.css';

interface State {
    parts: Part[];
}

class MainScreen extends React.Component<{}, State> {

    state: State = {
        parts: []
    };

    updateParts(parts: Part[]) {
        this.setState({
            parts: parts
        })
    }

    render(): JSX.Element {
        return (
            <div className={styles.MainWrapper}>
                <IngredientList parts={this.state.parts}></IngredientList>
                <Cup updateParts={this.updateParts.bind(this)}></Cup>
                <div>
                    <Ingredient name="Vodka" color={null}></Ingredient>
                    <Ingredient name="Gin" color={[217,228,201]}></Ingredient>
                    <Ingredient name="Whiskey" color={[204,142,105]}></Ingredient>
                    <Ingredient name="Rum" color={[68,54,44]}></Ingredient>
                    <Ingredient name="Orange Juice" color={[252,164,60]}></Ingredient>
                    <Ingredient name="Blue Curacao" color={[59,91,219]}></Ingredient>
                    <Ingredient name="Ice" color={null}></Ingredient>
                </div>
            </div>
        )
    }
}

export default MainScreen;