import { OptionValue } from "./OptionValue";

export interface Option {
  id: number;
  name_En: string;
  name_Ka: string;
  product_Id: number;
  type: string;
  optionValues: OptionValue[];
}

export class OptionClass implements Option {
  id: number;
  name_En: string;
  name_Ka: string;
  product_Id: number;
  type: string;
  optionValues: OptionValue[];

  constructor(
    id: number,
    name_En: string,
    name_Ka: string,
    product_Id: number,
    type: string,
    optionValues: OptionValue[] = []
  ) {
    this.id = id;
    this.name_En = name_En;
    this.name_Ka = name_Ka;
    this.product_Id = product_Id;
    this.type = type;
    this.optionValues = optionValues;
  }
}
