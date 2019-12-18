export class BaseStore{

    get authToken() {
        return "bearer " + localStorage.getItem("token");
    }

}
