import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Pizza.scss';
import {PizzaModel} from "../../models/PizzaModel";

interface PizzaProps {
    pizza: PizzaModel;
    handleAddToCart: React.MouseEventHandler;
}

const Pizza: React.FC<PizzaProps> = ({pizza, handleAddToCart}) => (
    <Card className = "pizza">
        <Card.Img
            variant = "top"
            src = {pizza.image_link}
        />
        <Card.Body>
            <div className = "d-flex align-items-center justify-content-between">
                <span className="name">{pizza.name}</span>
                <img src = {pizza.is_veg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}/>
            </div>
            <Card.Text>{pizza.description}</Card.Text>
            <div className = "d-flex align-items-center justify-content-between">
                <span className="price">${pizza.price}</span>
                <Button onClick = {handleAddToCart}>Add to cart</Button>
            </div>
        </Card.Body>
    </Card>
);

export default Pizza;
