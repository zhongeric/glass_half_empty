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
    const [rawColor, setRawColor] = useState([255,255,255]);
    const [color, setColor] = useState('rgb(255,255,255)');
    const [totalCount, setCount] = useState(0);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "INGREDIENT",
        // canDrop: (item) => !(item.type in ingredients),
        drop: (item: { type: string; name: string, color: Number[] }) => processIngredient(item),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
        
    })

    //colorChannelA and colorChannelB are ints ranging from 0 to 255
    function colorChannelMixer(colorChannelA: any, colorChannelB: any, amountToMix: any){
        var channelA = colorChannelA*amountToMix;
        var channelB = colorChannelB*(1-amountToMix);
        return Math.floor(channelA+channelB);
    }
    //rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
    //example (red): rgbA = [255,0,0]
    function colorMixer(rgbA: any, rgbB: any, amountToMix: number){
        console.log(rgbA, rgbB, amountToMix);
        var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
        var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
        var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
        setRawColor([r,g,b]);
        return "rgb("+r+","+g+","+b+")";
    }

    function processIngredient(item: { type: string; name: string, color: Number[] }) {
        let seen = false;
        let amount = 1;
        ingredients.forEach((val, idx) => {
            if(val.ingredientName == item.name) {
                amount = val.amount + 1;
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
        if(item.color) {
            let mix = 1
            if(totalCount > 0){
                mix = amount / (totalCount + 1);
                console.log(mix);
                setColor(colorMixer(rawColor, item.color, mix));
            }
            else {
                setColor(colorMixer(item.color, item.color, mix));
            }
        }  
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
                    height: `${100 + totalCount * 25}px`,
                    backgroundColor: color // colorMixer([255,0,0], [0,0,255], 0.5)
                }}
            >

            </div>
        </div>
    );
}