import { colorEnum, resultEnum } from "src/app/enums/rate.enum";

export interface NoteEntity{
    _id:string,

  date: Date,

  color: colorEnum,

  result: resultEnum,

  user: string,

  room: string;
}