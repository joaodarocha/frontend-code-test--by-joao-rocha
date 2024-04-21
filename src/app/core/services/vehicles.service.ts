import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../../bases/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, forkJoin, map, Observable, of } from 'rxjs';
import { Vehicle, VehicleWithDetails } from '../../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService extends ServiceBaseService {
  constructor(http: HttpClient) {
    super(http, 'vehicles');
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.get();
  }

  getVehicleDetailsById(id: string): Observable<VehicleWithDetails> {
    return this.get(id);
  }

  fetchAllVehiclesWithDetails(): Observable<VehicleWithDetails[]> {
    return this.getAllVehicles().pipe(
      concatMap((vehicles) =>
        // For each vehicle, make parallel API calls for details
        forkJoin(
          vehicles.map((vehicle) =>
            // Make an API call for each vehicle using its 'id'
            this.getVehicleDetailsById(vehicle.id).pipe(
              catchError((error) => {
                console.error(
                  `Error fetching details for vehicle ${vehicle.id}:\n`,
                  error,
                );
                // Return null if there's an error
                return of(null);
              }),
            ),
          ),
        ).pipe(
          map((details) =>
            this.mergeData(vehicles, details).filter(
              (vehicle) => vehicle !== null,
            ),
          ),
        ),
      ),
    );
  }

  mergeData(
    vehicles: Vehicle[],
    details: (VehicleWithDetails | null)[],
  ): VehicleWithDetails[] {
    // Merge the data as needed, for example, by adding details to each vehicle
    return vehicles
      .map((vehicle, index) => {
        // Ignore vehicles with null details
        if (details[index] === null) {
          return {} as VehicleWithDetails;
        }
        return { ...vehicle, ...details[index] };
      })
      .filter((vehicle) => !!vehicle.id);
  }
}
