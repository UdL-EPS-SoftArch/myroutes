import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Waypoint} from "../waypoint";
import {WaypointService} from "../waypoint.service";

@Component({
  selector: 'app-waypoint-edit',
  templateUrl: './waypoint-edit.component.html',
  styleUrls: ['./waypoint-edit.component.css']
})
export class WaypointEditComponent implements OnInit {
  public waypoint: Waypoint = new Waypoint();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private waypointService: WaypointService,
              private location: Location) {
  }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.waypointService.getResource(id).subscribe(
      (w: Waypoint) => {
        this.waypoint = w;
        this.waypoint.id = id;
      });
  }

  onSubmit() {
    this.waypointService.patchResource(this.waypoint).subscribe(
      (waypoint: Waypoint) => {
        this.router.navigate([waypoint.uri]);
      });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
}
