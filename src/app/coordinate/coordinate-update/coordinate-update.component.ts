import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Coordinate} from "../coordinate.entity";
import {CoordinateService} from "../coordinate.service";

@Component({
  selector: 'app-coordinate-update',
  templateUrl: './coordinate-update.component.html',
  styleUrls: ['./coordinate-update.component.scss']
})
export class CoordinateUpdateComponent implements OnInit {
  public coordinatee: Coordinate = new Coordinate();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private coordinateService: CoordinateService,
              private location: Location) {
  }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coordinateService.getResource(id).subscribe(
      (c: Coordinate) => {
        this.coordinatee = c;
        this.coordinatee.id = id;
      });
  }

  onSubmit() {
    this.coordinateService.patchResource(this.coordinatee).subscribe(
      (coordinate: Coordinate) => {
        this.router.navigate([coordinate.uri]);
      });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
}
