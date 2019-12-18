import React from "react";
import {inject, observer} from "mobx-react";
import {AUTH_STORE} from "../../../store/stores";
import {AuthStore} from "../../../store/AuthStore";
import Loader from "../../Loader/Loader";
import Card from "react-bootstrap/Card";
import {OrderModel} from "../../../models/OrderModel";
import {ChoiceModel} from "../../../models/ChoiceModel";
import Moment from "react-moment";
import {PizzaRow} from "../../Pizza/PizzaRow";

export interface MyOrdersProps {
    [AUTH_STORE]?: AuthStore;
}

class MyOrders extends React.Component<MyOrdersProps> {
    componentDidMount() {
        this.loadMyOrders();
    }

    async loadMyOrders() {
        const {authStore} = this.props;
        authStore.loadMyOrders();
    }

    render() {
        const {authStore: {myOrders}} = this.props;

        if (!myOrders) {
            return (
                <Loader/>
            )
        }

        return (
            <div className = "d-flex align-items-center justify-content-center">
                <Card style = {{
                    width  : '30rem',
                    padding: '1rem 3rem',
                }}>
                    <h3 className = "mb-3">My Orders</h3>
                    {
                        myOrders.map((myOrder: OrderModel) => {
                            return (
                                <Card className = "p-3 mb-3" key = {myOrder.id}>
                                    <h6 className = "my-3">
                                        <strong>Ordered on: </strong>
                                        <Moment format = "MMM DD, YYYY">{myOrder.updated_at}</Moment>
                                    </h6>
                                    {
                                        myOrder.choices.map((choice: ChoiceModel) => {
                                            return (
                                                <div key = {choice.id}>
                                                    <PizzaRow
                                                        isVeg = {choice.pizza.is_veg}
                                                        quantity = {choice.quantity}
                                                        name = {choice.pizza.name}
                                                        price = {choice.pizza.price}/>
                                                    <hr/>
                                                </div>
                                            )
                                        })
                                    }
                                    <span>Total: <strong>${myOrder.total}</strong></span>
                                </Card>
                            )
                        })
                    }
                </Card>
            </div>
        );
    }
}

export default inject(AUTH_STORE)(observer(MyOrders));
