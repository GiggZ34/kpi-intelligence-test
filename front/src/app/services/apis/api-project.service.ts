import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentSetupService} from "../environment-setup.service";
import {IListApi, IProject} from "../../models/data.models";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiProjectService {

  constructor(private _http: HttpClient, private _environmentSetupService: EnvironmentSetupService) { }

  getProjects(params: any): Promise<IListApi<IProject>> {
    const queryParamsValid = {
      "status": true,
      "city": true,
      "page": true,
      "search": true
    };
    return lastValueFrom(
      this._http.get<IListApi<IProject>>(
        `${this._environmentSetupService.rest_url}/api/v1/projects`,
        {
          params: Object.fromEntries(
            Object.entries(params).filter(
              ([key, _]) => key in queryParamsValid)) as any
        }));
  }

  getProject(id: string | number): Promise<IProject> {
    return lastValueFrom(this._http.get<IProject>(`${this._environmentSetupService.rest_url}/api/v1/projects/${id}`));
  }

  getKpi(id: string | number) {
    return lastValueFrom(this._http.get<IProject>(`${this._environmentSetupService.rest_url}/api/v1/projects/${id}/kpi`));
  }
}
