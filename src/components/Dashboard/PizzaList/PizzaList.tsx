import React from 'react';
import {PizzaModel} from "../../../models/PizzaModel";
import Loader from "../../Loader/Loader";
import Pizza from "../../Pizza/Pizza";

export interface PizzaListProps {
    pizzas: PizzaModel[]
}

export const PizzaList: React.FC<PizzaListProps> = ({pizzas}) => {
    return (
        <div className = "d-flex flex-wrap align-items-center justify-content-center">
            {pizzas.map((pizza: any) => (
                <Pizza
                    key = {pizza.id}
                    pizza = {pizza}
                />
            ))}
        </div>
    );
};
