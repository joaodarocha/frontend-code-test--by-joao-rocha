import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { VehiclesService } from '../../core/services/vehicles.service';
import { VehicleWithDetails } from '../../models/vehicle.model';
import { of } from 'rxjs';
import { VehicleListComponent } from '../../components/vehicle-list/vehicle-list.component';
import { CommonModule } from '@angular/common';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let mockVehiclesService: jasmine.SpyObj<VehiclesService>;

  beforeEach(async () => {
    mockVehiclesService = jasmine.createSpyObj('VehiclesService', [
      'fetchAllVehiclesWithDetails',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomepageComponent, CommonModule, VehicleListComponent],
      providers: [{ provide: VehiclesService, useValue: mockVehiclesService }],
    }).compileComponents();

    // Mock the behavior of fetchAllVehiclesWithDetails
    const mockVehicleWithDetails: VehicleWithDetails[] = [
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
    mockVehiclesService.fetchAllVehiclesWithDetails.and.returnValue(
      of(mockVehicleWithDetails),
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vehicles with details on initialization', () => {
    expect(component.vehiclesWithDetails$).toBeDefined();
    component.vehiclesWithDetails$.subscribe((vehicles) => {
      expect(vehicles).toEqual([
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
      ]);
    });
    expect(mockVehiclesService.fetchAllVehiclesWithDetails).toHaveBeenCalled();
  });
});
