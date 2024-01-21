import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Waypoint} from "../waypoint";
import {WaypointService} from "../waypoint.service";

@Component({
  selector: 'app-waypoint-delete',
  templateUrl: './waypoint-delete.component.html',
  styleUrls: ['./waypoint-delete.component.css']
})
export class WaypointDeleteComponent implements OnInit {

  public waypoint: Waypoint = new Waypoint();
  private id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private waypointService: WaypointService) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.waypointService.getResource(this.id).subscribe(
      w => this.waypoint = w);
  }

  delete(): void {
    this.waypointService.deleteResource(this.waypoint).subscribe(
      () => {
        this.router.navigate(['waypoints']);
      });
  }
}
