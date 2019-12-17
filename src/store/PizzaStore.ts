import axios from "axios";
import {ROUTE} from "../Routes";
import {action, observable} from "mobx";
import {PizzaModel} from "../models/PizzaModel";

export class PizzaStore {
    @observable pizzas: PizzaStore[];
    @action setPizzas = (p: PizzaStore[]) => (this.pizzas = p);

    async listPizzas() {
        try {
            const pizzas = await axios.get(ROUTE.Pizza.List);
            this.setPizzas(pizzas.data.data.map((pizza: any) => (new PizzaModel(pizza))));
        } catch (e) {
            console.log(e);
        }
    }
}
