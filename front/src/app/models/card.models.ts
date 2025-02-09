import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface ICardAddData {
  type: string;
  title: string;
  field?: string;
  icon?: IconDefinition;
  action?: (obj: any) => void;
}


export interface ICardData {
  title: string;
  idField: string;
  titleField: string;
  descriptionField: string;
  actionClick?: (obj: any) => void;
  addData?: ICardAddData[];
}
