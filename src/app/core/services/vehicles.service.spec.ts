import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VehiclesService } from './vehicles.service';
import { of } from 'rxjs';
import {
  Vehicle,
  VehicleDetails,
  VehicleWithDetails,
} from '../../models/vehicle.model';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpMock: HttpTestingController;
  let mockVehicles: Vehicle[];
  let mockDetails: VehicleDetails[];
  let mockMergedData: VehicleWithDetails[];
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiclesService],
    });
    service = TestBed.inject(VehiclesService);
    httpMock = TestBed.inject(HttpTestingController);

    baseUrl = 'https://frontend-code-test-api-jhbwml7vva-nw.a.run.app/api';

    // Define mock objects
    mockVehicles = [
      {
        id: '1',
        name: 'Vehicle 1',
        modelYear: '2022',
        apiUrl: 'apiUrl1',
        media: [],
      },
      {
        id: '2',
        name: 'Vehicle 2',
        modelYear: '2023',
        apiUrl: 'apiUrl2',
        media: [],
      },
    ];

    mockDetails = [
      {
        description: 'Description for Vehicle 1',
        price: 'Price for Vehicle 1',
        meta: {
          passengers: 5,
          drivetrain: ['FWD'],
          bodystyles: ['SUV'],
          emissions: { template: 'EU6', value: 120 },
        },
      },
    ];

    mockMergedData = [
      {
        id: '1',
        name: 'Vehicle 1',
        modelYear: '2022',
        apiUrl: 'apiUrl1',
        media: [],
        description: 'Description for Vehicle 1',
        price: 'Price for Vehicle 1',
        meta: {
          passengers: 5,
          drivetrain: ['FWD'],
          bodystyles: ['SUV'],
          emissions: { template: 'EU6', value: 120 },
        },
      },
      {
        id: '2',
        name: 'Vehicle 2',
        modelYear: '2022',
        apiUrl: 'apiUrl1',
        media: [],
        description: 'Description for Vehicle 2',
        price: 'Price for Vehicle 2',
        meta: {
          passengers: 5,
          drivetrain: ['FWD'],
          bodystyles: ['SUV'],
          emissions: { template: 'EU6', value: 120 },
        },
      },
    ];
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET method to retrieve all vehicles', () => {
    service.getAllVehicles().subscribe((vehicles) => {
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(`${baseUrl}/vehicles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should call GET method to retrieve vehicle details by ID', () => {
    service.getVehicleDetailsById('1').subscribe((details) => {
      expect(details).toEqual(mockDetails[0]); // Cast to VehicleWithDetails
    });

    const req = httpMock.expectOne(`${baseUrl}/vehicles/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails[0]);
  });

  it('should fetch all vehicles with details and merge them correctly', () => {
    spyOn(service, 'getAllVehicles').and.returnValue(of(mockVehicles));
    spyOn(service, 'getVehicleDetailsById').and.returnValues(
      of(mockDetails[0]),
      of(mockDetails[1]),
    );

    service.fetchAllVehiclesWithDetails().subscribe((data) => {
      expect(data).toEqual(mockMergedData);
    });
  });

  // it('should merge data correctly', () => {
  //   const result = service.mergeData(mockVehicles, mockDetails);
  //   expect(result).toEqual(mockMergedData);
  // });
});
