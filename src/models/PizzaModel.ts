import {BaseModel} from "./BaseModel";
import {action, observable} from "mobx";

export interface PizzaProps {
    id: number;
    name: string;
    description: string;
    is_veg: boolean;
    image_link: string;
    price: number;
}

export class PizzaModel extends BaseModel<PizzaProps> {
    @observable id: number;
    @observable name: string;
    @observable description: string;
    @observable is_veg: boolean;
    @observable image_link: string;
    @observable price: number;
    @observable quantity: number;

    constructor(props: PizzaProps) {
        super(props);
    }

    @action setQuantity(quantity: number) {
        this.quantity = quantity
    }
}
