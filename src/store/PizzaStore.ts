import axios from "axios";
import {ROUTE} from "../Routes";
import {action, computed, observable} from "mobx";
import {PizzaModel} from "../models/PizzaModel";
import {BaseStore} from "./BaseStore";

export class PizzaStore extends BaseStore {
    @observable pizzas: PizzaModel[];
    @action setPizzas = (p: PizzaModel[]) => (this.pizzas = p);

    async listPizzas() {
        try {
            const pizzas = await axios.get(ROUTE.Pizza.List);
            this.setPizzas(pizzas.data.data.map((pizza: any) => (new PizzaModel(pizza))));
        } catch (e) {
            console.log(e);
        }
    }

    async deliverOrder(data: any) {
        console.log(this.authToken);
        const headers = {
            'Content-Type' : 'application/json',
            'Authorization': this.authToken
        };
        try {
            await axios.post(ROUTE.Pizza.DELIVER_ORDER, {
                ...data
            }, {headers});
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }


    @computed
    get pizzasInCart() {
        return this.pizzas.filter((pizza: any) => {
            return !!(pizza.quantity);
        });
    }

    @computed
    get pizzaCountInCart() {
        return this.pizzasInCart.reduce((count, pizza: any) => {
            return (pizza.quantity || 0) + count;
        }, 0);
    }
}
