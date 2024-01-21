import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {WaypointService} from "../waypoint.service";
import {Waypoint} from "../waypoint";
import {Location} from "@angular/common";

@Component({
  selector: 'app-waypoint-detail',
  templateUrl: './waypoint-detail.component.html',
  styleUrls: ['./waypoint-detail.component.css']
})
export class WaypointDetailComponent implements OnInit {
  public waypoint: Waypoint = new Waypoint();

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private waypointService: WaypointService,
    private authenticationService: AuthenticationBasicService,
    private location: Location) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.waypointService.getResource(id).subscribe(
      (w: Waypoint) => {
        this.waypoint = w;
      });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

}
