import React from 'react';
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import Pizza from "../Pizza/Pizza";
import Loader from "../Loader/Loader";
import './Dashboard.scss';
import {AUTH_STORE, PIZZA_STORE} from "../../store/stores";
import {AuthStore} from "../../store/AuthStore";
import {PizzaStore} from "../../store/PizzaStore";

export interface DashboardProps {
    [AUTH_STORE]?: AuthStore;
    [PIZZA_STORE]?: PizzaStore;
}

class Dashboard extends React.Component<DashboardProps> {

    componentDidMount() {
        this.loadUser();
        this.loadPizza();
    }

    async loadPizza() {
        this.props.pizzaStore.listPizzas();
    }

    async loadUser() {
        this.props.authStore.loadUser();
    }

    @computed
    get renderCart() {
        const {pizzaStore: {pizzaInCart}} = this.props;

        if (pizzaInCart === 0) {
            return (
                <div className = "cart">
                    <img className = "icon" src = "/images/cart.png"/>
                </div>
            );
        }
        return (
            <div className = "cart">
                 <span className = "fa-stack fa-5x has-badge" data-count = {pizzaInCart}>
                     <img className = "icon" src = "/images/cart.png"/>
                 </span>
            </div>
        );
    }

    @computed
    get renderTopNav() {
        const {authStore: {currentUser}, pizzaStore: {pizzaInCart}} = this.props;
        return (
            <div className = "top-nav mb-5 p-3 d-flex justify-content-between align-items-center">
                <span onClick = {() => {
                    window.location.href = "/";
                }} className = "header px-3">Pizza
                    <img className = "icon" src = "/images/pizza.png"/>
                </span>
                <div className = "d-flex">
                    {!currentUser && <a className = "btn btn-outline-primary mr-3" href = "/login">Login</a>}
                    {this.renderCart}
                </div>
            </div>
        );
    }

    get renderPizzas() {
        return (
            <div className = "d-flex flex-wrap align-items-center justify-content-center">
                {this.props.pizzaStore.pizzas.map((pizza: any) => (
                    <Pizza
                        key = {pizza.id}
                        pizza = {pizza}
                    />
                ))}
            </div>
        );

    }

    render() {
        const {pizzas} = this.props.pizzaStore;
        if (!pizzas) {
            return <Loader/>
        }
        return (
            <div className = "dashboard">
                {this.renderTopNav}
                {this.renderPizzas}
            </div>
        );
    }
}

export default inject(AUTH_STORE, PIZZA_STORE)(observer(Dashboard));
