import {BaseModel} from "./BaseModel";
import {observable} from "mobx";

export interface PizzaProps {
    id: number;
    name: string;
    description: string;
    is_veg: string;
    image_link: string;
    price: number;
}

export class PizzaModel extends BaseModel<PizzaProps> {
    @observable id: number;
    @observable name: string;
    @observable description: string;
    @observable is_veg: string;
    @observable image_link: string;
    @observable price: number;

    constructor(props: PizzaProps) {
        super(props);
    }
}
