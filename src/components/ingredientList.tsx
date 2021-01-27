import React from 'react';
import { Part } from '../types/types';

type Props = {
    parts: Part[];
}

export const IngredientList: React.FC<Props> = ({
    parts
}) => {
    return (
        <div style={{textAlign: 'left', marginLeft: '3rem'}}>
            <h2>Ingredients:</h2>
            {parts.map((part: Part) => (
                <div>
                    {part.ingredientName} : {part.amount}
                </div>
                )
            )}
        </div>
    )
}