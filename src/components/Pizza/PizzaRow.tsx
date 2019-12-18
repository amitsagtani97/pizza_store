import React from "react";

export interface PizzaRowProps {
    isVeg: boolean;
    quantity: number;
    name: string;
    price: number;
}

export const PizzaRow: React.FC<PizzaRowProps> = ({isVeg, quantity, name, price}) => (
    <div
        className = "d-flex align-items-center justify-content-between">
        <div>
            <img style = {{height: '2rem'}}
                 src = {isVeg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}/>
            <span className = "mb-0 ml-2">{quantity} X {name}</span>
        </div>
        <span>${quantity * price}</span>
    </div>
);
