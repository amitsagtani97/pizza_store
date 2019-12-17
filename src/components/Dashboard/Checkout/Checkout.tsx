import {PizzaModel} from "../../../models/PizzaModel";
import React from "react";

export interface PizzaListProps {
    pizzas: PizzaModel[]
}

export const Checkout: React.FC<PizzaListProps> = ({pizzas}) => {
    return (
        <div>
            <h1>Your Order</h1>
            {
                pizzas.map((pizza: PizzaModel) => {
                    return (
                        <>
                            <h5>{pizza.name}</h5>
                            <div className = "d-flex justify-content-between align-items-center">
                                <span>Quantity: {pizza.quantity}</span>
                                <span>{pizza.quantity * pizza.price}</span>
                            </div>
                        </>
                    )
                })
            }
        </div>
    );
};
