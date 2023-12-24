import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { WaypointService } from '../waypoint.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Waypoint } from '../waypoint';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import {environment} from "../../../environments/environment";
import {Route} from "../../routes/route";
import {User} from "../../login-basic/user";
import {HttpClient} from "@angular/common/http";
import {Coordinate} from "../../coordinate/coordinate.entity";


@Component({
  selector: 'app-waypoint-list',
  templateUrl: './waypoint-list.component.html',
  styleUrls: ['./waypoint-list.component.css'],
})
export class WaypointListComponent implements OnInit{
  public waypointsPagedResource: PagedResourceCollection<Waypoint>;
  public waypoints: Waypoint[] = [];
  public pageSize = 5;
  public page = 1;
  public totalWaypoints = 0;
  public sortBy = 'Title';
  public sortOrder = 'A-Z';
  public types: [];
  public type: string;

  constructor(
    public router: Router,
    private waypointService: WaypointService,
    private authenticationService: AuthenticationBasicService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.API}/profile/waypoints`)
      .subscribe(data => {
        this.types = (data.alps.descriptor[0].descriptor[2].doc.value).split(',');
      });
    this.waypointService.getPage({ pageParams: { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Waypoint>) => {
        this.waypoints = page.resources;
        this.totalWaypoints = page.totalElements;
        this.waypointsPagedResource = page;
        this.waypoints.map(waypoints => {
          waypoints.getRelation('location')
            .subscribe((coordinate: Coordinate) => {
              waypoints.location = coordinate;
            });
        });
      });
  }

  changePage(): void {
    this.waypointsPagedResource.customPage(
      {pageParams: {page: this.page - 1, size: this.pageSize},
        sort: {name: 'ASC'}}).subscribe(
      (page: PagedResourceCollection<Waypoint>) => {
        this.waypoints = page.resources;
        this.waypoints.map(waypoint => {
          waypoint.getRelation('location')
            .subscribe((coordinate: Coordinate) => {
              waypoint.location = coordinate;
            });
        });
      });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  modifyList(waypointsPagedResource: PagedResourceCollection<Waypoint>): void {
    this.waypointsPagedResource = waypointsPagedResource;
    this.waypoints = this.waypointsPagedResource.resources;
    this.totalWaypoints = this.waypointsPagedResource.totalElements;
  }

  reBind(waypoints: any): void {
    this.modifyList(waypoints);
  }

  detail(waypoint: Waypoint): void {
    this.router.navigate([waypoint.uri]);
  }
}
