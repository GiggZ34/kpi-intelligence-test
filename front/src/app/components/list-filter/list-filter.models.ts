export interface ChoiceAttribute {
  title: string;
  choices: string[];
  url_name: string;
}


export interface FilterAttributeModel {
  search: boolean;
  choice?: ChoiceAttribute;
  multi_choices?: ChoiceAttribute;
}
