import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentSetupService} from "../environment-setup.service";
import {IEstablishment, IListApi, IProject} from "../../models/data.models";

@Injectable({
  providedIn: 'root'
})
export class ApiEstablishmentService {

  constructor(private _http: HttpClient, private _environmentSetupService: EnvironmentSetupService) { }

  getEstablishments(params: any): Promise<IListApi<IEstablishment>> {
    const queryParamsValid = {
      "status": true,
      "city": true,
      "page": true,
      "search": true
    };
    return lastValueFrom(
      this._http.get<IListApi<IEstablishment>>(
        `${this._environmentSetupService.rest_url}/api/v1/establishments`,
        {
          params: Object.fromEntries(
            Object.entries(params).filter(
              ([key, _]) => key in queryParamsValid)) as any
        }));
  }

  getEstablishment(id: string): Promise<IEstablishment> {
    return lastValueFrom(this._http.get<IEstablishment>(`${this._environmentSetupService.rest_url}/api/v1/establishments/${id}`));
  }
}
