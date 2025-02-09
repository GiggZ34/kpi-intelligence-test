import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export  interface ITableAction {
  icon: IconDefinition;
  title: string;
  action: (obj: any) => void;
}


export interface ITableColumn {
  type: string;
  title: string;
  field?: string[];
  not_exist?: string;
  prefix?: string;
  suffix?: string;
  actions?: ITableAction[];
}
