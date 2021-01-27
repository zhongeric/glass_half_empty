import React from 'react';
import { useDrag } from 'react-dnd';
import { IngredientTypes } from '../../types/IngredientTypes';
import styles from './Ingredient.module.css';

type Props = {
    name: string
    color: Number[] | null
}

export const Ingredient: React.FC<Props> = ({
    name,
    color
}) => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: "INGREDIENT", name: name, color: color},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
            className={styles.Ingredient}
        >
            {name}
        </div>
    )
}