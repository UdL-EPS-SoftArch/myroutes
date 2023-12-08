import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Coordinate} from "../coordinate.entity";
import {CoordinateService} from "../coordinate.service";

@Component({
  selector: 'app-coordinate-delete',
  templateUrl: './coordinate-delete.component.html',
  styleUrls: ['./coordinate-delete.component.scss']
})
export class CoordinateDeleteComponent implements OnInit {

  public coordinate: Coordinate = new Coordinate();
  private id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private coordinateService: CoordinateService) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coordinateService.getResource(this.id).subscribe(
      c => this.coordinate = c);
  }

  delete(): void {
    this.coordinateService.deleteResource(this.coordinate).subscribe(
      () => {
        this.router.navigate(['coordinates']);
      });
  }
}
