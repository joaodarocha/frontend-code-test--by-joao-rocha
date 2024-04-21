import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceBaseService {
  private baseURL =
    'https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/api';

  constructor(
    protected http: HttpClient,
    @Inject('controllerName') controllerName: string,
  ) {
    if (controllerName) {
      this.baseURL = `${this.baseURL}/${controllerName}`;
    }
  }

  get(endpoint?: string): Observable<any> {
    const url = this.buildUrl(endpoint);
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  buildUrl(endpoint?: string): string {
    return endpoint ? `${this.baseURL}/${endpoint}` : this.baseURL;
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      // handle 400 errors
    }
    if (error.status === 500) {
      // handle 500 errors
    }
    if (error.status === 404) {
      // handle 404 errors
    }
    console.error(
      `API returned code ${error.status}\n Error body was: `,
      error.error,
    );
    return throwError(
      () => new Error('There was an error, please try again later'),
    );
  }
}
