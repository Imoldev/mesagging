import {DateTime} from "luxon";

export function plusToDatetime (initialDate: Date, plusInterval: number): Date {
    return  DateTime.fromJSDate(initialDate).plus(plusInterval).toJSDate();
}