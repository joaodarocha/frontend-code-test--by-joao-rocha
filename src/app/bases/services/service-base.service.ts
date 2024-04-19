import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {
  private baseURL = 'https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/api/'

  constructor(
    protected http: HttpClient,
    @Inject('controllerName') controllerName: string
  ) {
    if (controllerName) {
      this.baseURL = `${this.baseURL}/${controllerName}`;
    }
  }

  get(endpoint?: string): Observable<any> {
    const url = this.buildUrl(endpoint);
    return this.http.get(url);
  }

  buildUrl(endpoint?: string): string {
    return endpoint ? `${this.baseURL}/${endpoint}` : this.baseURL;
  }
}
