import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {CoordinateService} from "../coordinate.service";
import {Coordinate} from "../coordinate.entity";
import {Location} from "@angular/common";

@Component({
  selector: 'app-coordinate-detail',
  templateUrl: './coordinate-detail.component.html',
  styleUrls: ['./coordinate-detail.component.scss']
})
export class CoordinateDetailComponent implements OnInit {
  public coordinatee = new Coordinate();

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private coordinateService: CoordinateService,
    private authenticationService: AuthenticationBasicService,
    private location: Location) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coordinateService.getResource(id).subscribe(
      (c: Coordinate) => {
        this.coordinatee = c;
      });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

}
