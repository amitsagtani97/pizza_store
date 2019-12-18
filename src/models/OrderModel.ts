import {BaseModel} from "./BaseModel";
import {observable} from "mobx";
import {ChoiceModel} from "./ChoiceModel";

export interface PizzaProps {
     id: number;
     status: string;
     total: number;
     created_at: string;
     updated_at: string;
     choices: ChoiceModel[];
}

export class OrderModel extends BaseModel<PizzaProps> {
    @observable id: number;
    @observable status: string;
    @observable total: number;
    @observable created_at: string;
    @observable updated_at: string;
    @observable choices: ChoiceModel[];

    constructor(props: PizzaProps) {
        super(props);
    }
}
