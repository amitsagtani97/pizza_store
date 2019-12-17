import axios from "axios";
import {ROUTE} from "../Routes";
import {action, observable} from "mobx";
import {UserModel} from "../models/UserModel";

export class AuthStore {
    @observable currentUser: UserModel;
    @action setCurrentUser = (currentUser: UserModel) => (this.currentUser = currentUser);

    async loadUser() {
        try {
            const user = await axios.get(ROUTE.ME, {headers: {Authorization: this.authToken}});
            this.setCurrentUser(user.data.data);
        } catch (e) {
            localStorage.removeItem("token");
            console.log(e);
        }
    }

    async login(email: string, password: string) {
        try {
            const data = await axios.get(ROUTE.LOGIN, {params: {email, password}});
            this.setCurrentUser(data.data.data);
            localStorage.setItem("token", data.data.token);
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }

    get authToken() {
        return "bearer " + localStorage.getItem("token");
    }

}
