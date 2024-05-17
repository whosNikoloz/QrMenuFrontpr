export interface OptionValue {
  selected: any;
  id: number;
  name_En: string;
  name_Ka: string;
  price: number;
  option_Id: number;
}

export class OptionValueClass implements OptionValue {
  id: number;
  name_En: string;
  name_Ka: string;
  price: number;
  option_Id: number;

  constructor(
    id: number,
    name_En: string,
    name_Ka: string,
    price: number,
    option_Id: number
  ) {
    this.id = id;
    this.name_En = name_En;
    this.name_Ka = name_Ka;
    this.price = price;
    this.option_Id = option_Id;
  }
  selected: any;
}
