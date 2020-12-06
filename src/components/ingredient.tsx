import React from 'react';
import { useDrag } from 'react-dnd';
import { IngredientTypes } from '../types/IngredientTypes';

type Props = {
    name: string
}

export const Ingredient: React.FC<Props> = ({
    name
}) => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: "INGREDIENT", name: name},
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
        >
            {name}
        </div>
    )
}