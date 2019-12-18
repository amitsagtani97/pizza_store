import {BaseModel} from "./BaseModel";
import {observable} from "mobx";
import {PizzaModel} from "./PizzaModel";

export interface PizzaProps {
    id: number;
    pizza: PizzaModel;
    quantity: number;
}

export class ChoiceModel extends BaseModel<PizzaProps> {
    @observable id: number;
    @observable pizza: PizzaModel;
    @observable quantity: number;

    constructor(props: PizzaProps) {
        super(props);
    }
}
