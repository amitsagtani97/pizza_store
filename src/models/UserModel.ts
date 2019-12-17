import {BaseModel} from "./BaseModel";
import {observable} from "mobx";

export interface PizzaProps {
    id: number;
    display_name: string;
    email: string;
    phone: string;
    address: string;
}

export class UserModel extends BaseModel<PizzaProps> {
    @observable id: number;
    @observable display_name: string;
    @observable email: string;
    @observable phone: string;
    @observable address: string;

    constructor(props: PizzaProps) {
        super(props);
    }
}
