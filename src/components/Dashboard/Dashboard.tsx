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

    constructor(props: any) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart() {
        // todo do something
    }

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
    get renderTopNav() {
        const {currentUser} = this.props.authStore;
        return (
            <div className = "top-nav mb-5 p-3 d-flex justify-content-between align-items-center">
                <span onClick = {() => {
                    window.location.href = "/";
                }} className = "header px-3">Pizza
                    <img className = "icon" src = "/images/pizza.png"/>
                </span>
                <div className = "d-flex">
                    {!currentUser && <a className = "btn btn-outline-primary mr-3" href = "/login" >Login</a>}
                    <div className = "cart">
                        <span className = "fa-stack fa-5x has-badge" data-count = "10">
                            <img className = "icon" src = "/images/cart.png"/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    @computed
    get renderPizzas() {
        const {pizzas} = this.props.pizzaStore;
        return (
            <div className = "d-flex flex-wrap align-items-center justify-content-center">
                {pizzas.map((pizza: any) => (
                    <Pizza
                        key = {pizza.id}
                        pizza = {pizza}
                        handleAddToCart = {this.handleAddToCart}
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
