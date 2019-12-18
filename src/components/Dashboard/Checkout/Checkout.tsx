import {PizzaModel} from "../../../models/PizzaModel";
import React, {useState} from "react";
import "./Checkout.scss";
import Card from "react-bootstrap/Card";
import {UserModel} from "../../../models/UserModel";
import {Button, Form} from "react-bootstrap";
import {PizzaStore} from "../../../store/PizzaStore";

export interface PizzaListProps {
    pizzaStore: PizzaStore;
    pizzas: PizzaModel[]
    currentUser?: UserModel;
}

export const Checkout: React.FC<PizzaListProps> = ({pizzas, currentUser, pizzaStore}) => {
    const [address, setAddress] = useState('');

    if (!pizzas || pizzas.length === 0) {
        window.location.href = "/";
        return;
    }

    const totalAmount = () => {
        return pizzas.reduce((carry, pizza) => {
            return carry + pizza.quantity * pizza.price;
        }, 0);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const choices = pizzas.reduce((carry, pizza) => {
            carry.push({pizza_id: pizza.id, quantity: pizza.quantity});
            return carry;
        }, []);
        pizzaStore.deliverOrder({address, choices, total: totalAmount()});
    };

    return (
        <div className = "d-flex align-items-center justify-content-center">
            <Card className = "checkout">
                <h4 className = "mb-3">Your Order</h4>
                {
                    pizzas.map((pizza: PizzaModel) => {
                        return (
                            <div key = {pizza.id}>
                                <div className = "d-flex align-items-center">
                                    <img style = {{height: '2rem'}}
                                         src = {pizza.is_veg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}/>
                                    <h5 className = "mb-0 ml-2">{pizza.name}</h5>
                                </div>
                                <div className = "d-flex justify-content-between align-items-center">
                                    <span className = "font-weight-bold">Quantity: {pizza.quantity}</span>
                                    <span className = "font-weight-bold">{pizza.quantity * pizza.price}</span>
                                </div>
                                <hr/>
                            </div>
                        )
                    })
                }
                <div className = "d-flex justify-content-between align-items-center">
                    <span className = "font-weight-bold">Subtotal:</span>
                    <span className = "font-weight-bold">{totalAmount()}</span>
                </div>
                <br/>

                <Form className = "login" onSubmit = {handleSubmit}>
                    {!currentUser && <Form.Group controlId = "address">
						<Form.Label>Email address</Form.Label>
						<Form.Control type = "text"
						              placeholder = "Enter your delivery address"
						              value = {address} required
						              onChange = {(event: any) => setAddress(event.target.value)}/>
					</Form.Group>
                    }

                    <Button variant = "primary" type = "submit">
                        Continue
                    </Button>
                </Form>
            </Card>
        </div>
    );
};
