import { colorEnum } from "src/app/enums/rate.enum";

export interface ResultEntity{
    color:colorEnum; 
}

export interface RateDTO{
    color: string;

    user: string;

    room: string;

    login: string;
}

export interface SomeBodyRateEntity{
    color: colorEnum;

    login: string;
}