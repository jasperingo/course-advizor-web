import { Expose, Type } from "class-transformer";
import { Result } from "./Result";

export enum Grade {
  A = 'A', 
  B = 'B', 
  C = 'C', 
  D = 'D', 
  E = 'E', 
  F = 'F'
}

export class StudentResult {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose()
  grade?: Grade;

  @Expose()
  @Type(()=> Result)
  result?: Result;

}
