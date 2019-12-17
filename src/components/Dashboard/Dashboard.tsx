import React from 'react';
import {Link, Route, RouteComponentProps, Switch} from 'react-router-dom';

import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import Loader from "../Loader/Loader";
import './Dashboard.scss';
import {AUTH_STORE, PIZZA_STORE} from "../../store/stores";
import {AuthStore} from "../../store/AuthStore";
import {PizzaStore} from "../../store/PizzaStore";
import {PizzaList} from "./PizzaList/PizzaList";
import {Checkout} from "./Checkout/Checkout";

export interface DashboardProps extends RouteComponentProps {
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
        const {pizzaStore: {pizzaCountInCart}, match} = this.props;
        if (pizzaCountInCart === 0) {
            return (
                <div className = "cart">
                    <img className = "icon" src = "/images/cart.png"/>
                </div>
            );
        }
        return (
            <div className = "cart">
                <Link to = "/checkout">
                    <span className = "fa-stack fa-5x has-badge" data-count = {pizzaCountInCart}>
                     <img className = "icon" src = "/images/cart.png"/>
                    </span>
                </Link>
            </div>
        );
    }

    @computed
    get renderTopNav() {
        const {authStore: {currentUser}} = this.props;
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

    render() {
        const {pizzaStore, match} = this.props;
        if (!pizzaStore.pizzas) {
            return <Loader/>
        }
        return (
            <div className = "dashboard">
                {this.renderTopNav}
                <Switch>
                    <Route exact
                           path = "/"
                           render = {props => <PizzaList pizzas = {pizzaStore.pizzas}/>}/>
                    <Route exact
                           path = "/checkout"
                           render = {props => <Checkout pizzas = {pizzaStore.pizzasInCart}{...props} />}/>
                </Switch>
            </div>
        );
    }
}

export default inject(AUTH_STORE, PIZZA_STORE)(observer(Dashboard));
