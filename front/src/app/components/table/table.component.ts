import {Component, Input} from '@angular/core';
import {FilterAttributeModel} from "../list-filter/list-filter.models";
import {ITableColumn} from "../../models/table.models";

@Component({
  selector: 'com-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() attribute: FilterAttributeModel | undefined;
  @Input() columns: ITableColumn[] = [];
  @Input() rows: any[] = [];

  fieldInObject(obj: any, column: ITableColumn) {
    let result = obj;

    for (const field of column.field ?? []) {
      if (!result) {
        return result;
      }

      result = result[field];
    }
    return result
      ? (
        (column.prefix ?? "")
        + result
        + (column.suffix ?? ""))
      : (column.not_exist ?? "Non renseigné");
  }
}
