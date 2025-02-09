import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentSetupService {
  public rest_url: string = "";

  constructor() {
    this.rest_url = (window as any)["__env"] ? (window as any)["__env"].rest_url : "";
  }
}
