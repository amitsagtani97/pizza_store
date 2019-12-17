import {AuthStore} from "./AuthStore";
import {AUTH_STORE, PIZZA_STORE} from "./stores";
import {PizzaStore} from "./PizzaStore";

export function createStores() {
    return {
        [AUTH_STORE] : new AuthStore(),
        [PIZZA_STORE]: new PizzaStore()
    };
}
