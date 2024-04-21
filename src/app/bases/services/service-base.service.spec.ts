import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ServiceBaseService } from './service-base.service';

describe('ServiceBaseService', () => {
  let service: ServiceBaseService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ServiceBaseService,
        { provide: HttpClient, useValue: spy },
        { provide: 'controllerName', useValue: 'mockController' }, // Provide mock value for controllerName
      ],
    });

    service = TestBed.inject(ServiceBaseService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should return an observable with data', () => {
      const mockData = { id: 1, name: 'Test' };
      httpClientSpy.get.and.returnValue(of(mockData));

      service.get().subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      expect(httpClientSpy.get).toHaveBeenCalledOnceWith(service.buildUrl());
    });

    it('should handle error response', () => {
      const mockErrorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found',
      });
      httpClientSpy.get.and.returnValue(throwError(mockErrorResponse));

      service.get().subscribe(
        () => {},
        (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe(
            'There was an error, please try again later',
          );
        },
      );

      expect(httpClientSpy.get).toHaveBeenCalledOnceWith(service.buildUrl());
    });
  });

  describe('buildUrl', () => {
    it('should build the correct URL without endpoint', () => {
      const url = service.buildUrl();
      expect(url).toBe(
        'https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/api/mockController',
      ); // Adjust the expected URL
    });

    it('should build the correct URL with endpoint', () => {
      const endpoint = 'test';
      const url = service.buildUrl(endpoint);
      expect(url).toBe(
        'https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/api/mockController/test',
      ); // Adjust the expected URL
    });
  });
});
