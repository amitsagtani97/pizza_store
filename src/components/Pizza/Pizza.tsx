import React from 'react';
import Card from 'react-bootstrap/Card';
import './Pizza.scss';
import {PizzaModel} from "../../models/PizzaModel";

interface PizzaProps {
    pizza: PizzaModel;
}

const Pizza: React.FC<PizzaProps> = ({pizza}) => {


    const addToCart = () => {
        pizza.setQuantity((pizza.quantity || 0) + 1);
    };

    const removeFromCart = () => {
        pizza.setQuantity((pizza.quantity || 0) - 1);
    };

    const addToCartBtn = () => {
        const quantity = pizza.quantity || 0;
        if (quantity === 0) {
            return (
                <button className = "btn btn-outline-primary" onClick = {addToCart}>Add to cart</button>
            )
        }
        return (
            <div className = "d-inline-block">
                <button className = "btn btn-outline-primary" onClick = {removeFromCart}> -</button>
                <input className="input-quantity" type = "text" value = {quantity} readOnly/>
                <button className = "btn btn-outline-primary" onClick = {addToCart}> +</button>
            </div>
        )
    };

    return (
        <Card className = "pizza">
            <Card.Img
                variant = "top"
                src = {pizza.image_link}
            />
            <Card.Body>
                <div className = "d-flex align-items-center justify-content-between">
                    <span className = "name">{pizza.name}</span>
                    <img src = {pizza.is_veg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}/>
                </div>
                <Card.Text>{pizza.description}</Card.Text>
                <div className = "d-flex align-items-center justify-content-between">
                    <span className = "price">${pizza.price}</span>
                    {addToCartBtn()}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Pizza;
