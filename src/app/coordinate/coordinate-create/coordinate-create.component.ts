import {Component} from '@angular/core';
import {Coordinate} from "../coordinate.entity";
import {CoordinateService} from "../coordinate.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-coordinate-create',
  templateUrl: './coordinate-create.component.html',
  styleUrls: ['./coordinate-create.component.scss']
})
export class CoordinateCreateComponent {
  public coordinate: Coordinate = new Coordinate();

  constructor(
    private coordinateService: CoordinateService,
    private router: Router,
    private location: Location
  ) {
  }

  onSubmit(): void {

    this.coordinateService.createResource({body: this.coordinate}).subscribe(
      (coordinate: Coordinate) => this.router.navigate([coordinate.uri]));
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

}
