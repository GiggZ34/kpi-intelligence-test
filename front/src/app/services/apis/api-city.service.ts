import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentSetupService} from "../environment-setup.service";
import {ICity} from "../../models/data.models";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiCityService {

  constructor(private _http: HttpClient, private _environmentSetupService: EnvironmentSetupService) { }

  getCities(): Promise<ICity[]> {
    return lastValueFrom(this._http.get<ICity[]>(`${this._environmentSetupService.rest_url}/api/v1/cities`));
  }
}
