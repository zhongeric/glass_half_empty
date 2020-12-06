import React, { useState, useEffect } from 'react';
import { DragObjectWithType, useDrop } from 'react-dnd';
import { IngredientTypes } from '../../types/IngredientTypes';
import { Part } from '../../types/types';

import styles from './Cup.module.css';

type Props = {
    updateParts: Function;
}

export const Cup: React.FC<Props> = ({
    updateParts
}) => {
    const emptyArray: Part[] = [];
    const [ingredients, addIngredient] = useState(emptyArray);
    const [totalCount, setCount] = useState(0);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "INGREDIENT",
        // canDrop: (item) => !(item.type in ingredients),
        drop: (item: { type: string; name: string }) => processIngredient(item),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
        
    })

    function processIngredient(item: { type: string; name: string }) {
        let seen = false;
        ingredients.forEach((val, idx) => {
            if(val.ingredientName == item.name) {
                addIngredient(
                    ingredients.map(ing => 
                        ing.ingredientName === item.name 
                        ? {...ing, amount : ing.amount + 1} 
                        : ing 
                ))
                seen = true;
            }
        })
        if(!seen){
            addIngredient(ingredients => [...ingredients, {ingredientName: item.name, amount: 1}]);
        }
        setCount(totalCount => totalCount + 1);
    }

    useEffect(() => {
        // console.log(ingredients)
        updateParts(ingredients);
     }, [ingredients]);

     useEffect(() => {
        
     }, [totalCount]);

    return (
        <div
            ref={drop}
            className={styles.Cup}
        >
            <div 
                className={`${styles.Water}`}
                style={{
                    height: `${100 + totalCount * 25}px`
                }}
            >

            </div>
        </div>
    );
}