import { Component } from '@angular/core';
import { VehicleListComponent } from '../../components/vehicle-list/vehicle-list.component';
import { VehiclesService } from '../../core/services/vehicles.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { VehicleWithDetails } from '../../models/vehicle.model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  imports: [VehicleListComponent, CommonModule],
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  vehiclesWithDetails$: Observable<VehicleWithDetails[]> =
    this.vehicleService.fetchAllVehiclesWithDetails();

  constructor(private vehicleService: VehiclesService) {}
}
