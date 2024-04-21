import { Component, Input } from '@angular/core';
import { VehicleWithDetails } from '../../models/vehicle.model';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from '../vehicle/vehicle.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, VehicleComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent {
  @Input() vehicles!: VehicleWithDetails[];
}
