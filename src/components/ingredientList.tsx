import React from 'react';
import { Part } from '../types/types';

type Props = {
    parts: Part[];
}

export const IngredientList: React.FC<Props> = ({
    parts
}) => {
    return (
        <div>
            {parts.map((part: Part) => (
                <div>
                    {part.ingredientName} : {part.amount}
                </div>
                )
            )}
        </div>
    )
}