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
                    <Ingredient name="Vodka"></Ingredient>
                    <Ingredient name="Gin"></Ingredient>
                    <Ingredient name="Whiskey"></Ingredient>
                    <Ingredient name="Rum"></Ingredient>
                    <Ingredient name="Orange Juice"></Ingredient>
                    <Ingredient name="Ice"></Ingredient>
                </div>
            </div>
        )
    }
}

export default MainScreen;