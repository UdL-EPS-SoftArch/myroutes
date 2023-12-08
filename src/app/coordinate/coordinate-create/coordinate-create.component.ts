import {Component, OnInit} from '@angular/core';
import {Coordinate} from "../coordinate.entity";
import {CoordinateService} from "../coordinate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coordinate-create',
  templateUrl: './coordinate-create.component.html',
  styleUrls: ['./coordinate-create.component.scss']
})
export class CoordinateCreateComponent {
  public coordinate: Coordinate = new Coordinate();
  coordinatesPattern: "^(-?([0-8]?[0-9](\\.\\d+)?|89(.[0]+)?)[,])+(-?([1]?[0-7]?[0-9](\\.\\d+)?|179((.[0]+)?)))$";

  constructor(
    private coordinateService: CoordinateService,
    private router: Router
  ) {}

  onSubmit(): void {
    debugger;
    this.coordinateService.createResource({ body: this.coordinate }).subscribe(
      (coordinate:Coordinate) => this.router.navigate([coordinate.uri]));
  }

}
