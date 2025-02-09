import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  public setFilter(value: {[key: string]: any}) {
    const queryParams = Object.fromEntries(Object.entries({
      ...this._route.snapshot.queryParams,
      ...value
    }).filter(([_, value]) => value !== undefined && value !== null && value !== ""));

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams
    });
  }
}
