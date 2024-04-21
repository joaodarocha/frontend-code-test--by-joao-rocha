import { Component, Input } from '@angular/core';
import { VehicleWithDetails } from '../../models/vehicle.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  @Input() vehicleDetails!: VehicleWithDetails;
}
