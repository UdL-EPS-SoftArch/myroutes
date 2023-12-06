import {Component} from '@angular/core';
import {Coordinate} from "../coordinate.entity";
import {Router} from "@angular/router";
import {CoordinateService} from "../coordinate.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {ColumnMode} from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-coordinate-list',
  templateUrl: './coordinate-list.component.html',
  styleUrls: ['./coordinate-list.component.scss']
})
export class CoordinateListComponent {
  public coordinates: Coordinate[] = [];
  public pageSize = 5;
  public page = 1;
  public totalCoordinates = 0;
  public sortBy = 'Coordinate';
  public sortOrder = 'A-Z';
  rows = [
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' }
    ];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  constructor(
      public router: Router,
      private coordinateService: CoordinateService,
      private authenticationService: AuthenticationBasicService
  ) {
  }

  ngOnInit() {
    this.coordinateService.getPage({
      pageParams: {size: this.pageSize},
      sort: {coordinate: 'ASC'},
    }).subscribe((page: PagedResourceCollection<Coordinate>) => {
      this.coordinates = page.resources;
      this.totalCoordinates = page.totalElements;
      // this.sortSeeds();
    });

  }

  isRole(admin: string) {
    return true;
  }

  searchSeeds($event: any) {

  }

  updateSortOrder(az: string) {

  }

  changePage() {

  }

  detail(coordinates: Coordinate[]) {

  }

  protected readonly ColumnMode = ColumnMode;

  updateFilter($event: KeyboardEvent) {
    
  }
}
