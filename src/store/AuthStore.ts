import axios from "axios";
import {ROUTE} from "../Routes";
import {action, observable} from "mobx";
import {UserModel} from "../models/UserModel";
import {BaseStore} from "./BaseStore";
import {OrderModel} from "../models/OrderModel";

export class AuthStore extends BaseStore {
    @observable myOrders: OrderModel[];
    @observable currentUser: UserModel;
    @action setMyOrders    = (orders: OrderModel[]) => (this.myOrders = orders);
    @action setCurrentUser = (currentUser: UserModel) => (this.currentUser = currentUser);

    async loadUser() {
        try {
            const data = await axios.get(ROUTE.ME, {headers: {Authorization: this.authToken}});
            this.setCurrentUser(new UserModel(data.data.data));
        } catch (e) {
            this.logOut();
        }
    }

    async login(email: string, password: string) {
        try {
            const data = await axios.get(ROUTE.LOGIN, {params: {email, password}});
            this.setCurrentUser(new UserModel(data.data.data));
            localStorage.setItem("token", data.data.token);
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }

    async loadMyOrders() {
        try {
            const orders = await axios.get(ROUTE.MY_ORDERS, {headers: {Authorization: this.authToken}});
            this.setMyOrders(orders.data.data.map((order: any) => new OrderModel(order)));
        } catch (e) {
            if(e.response.status === 401){
                window.location.href = "/login";
            }
        }
    }

    logOut(){
        localStorage.removeItem("token");
    }
}


