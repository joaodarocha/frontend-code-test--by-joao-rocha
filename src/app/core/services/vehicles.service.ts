import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../../bases/services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleDetails } from '../../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends ServiceBaseService{

  constructor(http: HttpClient) {
    super(http, 'vehicles')
  }

  getAllVehicles(): Observable<Vehicle[]>{
    return this.get();
  }

  getVehicleDetails(id: string): Observable<VehicleDetails> {
    return this.get(id);
  }
}
