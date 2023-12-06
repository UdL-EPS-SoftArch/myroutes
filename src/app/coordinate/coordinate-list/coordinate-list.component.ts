import {Component, OnInit, ViewChild} from '@angular/core';
import {Coordinate} from "../coordinate.entity";
import {Router} from "@angular/router";
import {CoordinateService} from "../coordinate.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-coordinate-list',
  templateUrl: './coordinate-list.component.html',
  styleUrls: ['./coordinate-list.component.scss']
})

export class CoordinateListComponent implements OnInit {
  public coordinates: Coordinate[] = [];
  public pageSize = 10;
  public currentPage = 1;
  public totalCoordinates = 0;
  temp = [];
  @ViewChild(DatatableComponent) tableCoordinates: DatatableComponent;
  loading: boolean = true;
  rows = [
      //{ coordinate: 'test,test' },
      //{ coordinate: '1232131,122312331' },
    ];
  columns = [
    // { prop: 'id', name: 'ID' },
    { prop: 'coordinate', name: 'Coordinate' },
    {name: 'Actions', prop: 'actions', sortable: false, 'template': true}];

  constructor(
      public router: Router,
      private coordinateService: CoordinateService,
      private authenticationService: AuthenticationBasicService
  ) {
    this.temp = this.rows;
  }

  ngOnInit() {
    this.loading = true;
    this.coordinateService.getPage({
      pageParams: {size: this.pageSize, page: this.currentPage},
      sort: {coordinate: 'ASC'},
    }).subscribe((page: PagedResourceCollection<Coordinate>) => {
      this.coordinates = page.resources;
      this.totalCoordinates = page.totalElements;
      this.coordinates.map(coordinate => {
        this.rows.push({coordinate: coordinate.coordinate});
      });
      this.temp = this.rows;
      this.rows = [...this.rows];
      this.loading = false;
      this.tableCoordinates.offset = 0;
    });

  }


  detail(coordinates: Coordinate[]) {

  }

  protected readonly ColumnMode = ColumnMode;

  updateFilter(event) {
    this.loading = true;
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      // return d.id.toLowerCase().indexOf(val) !== -1 || !val || d.coordinate.toLowerCase().indexOf(val) !== -1;
      return !val || d.coordinate.toLowerCase().indexOf(val) !== -1;
    });
    this.rows = temp;
    this.tableCoordinates.offset = 0;
    this.loading = false;
  }

  setPage(pageInfo) {
    this.currentPage = pageInfo.offset;
    this.loading = true;
    this.rows = [];
    this.coordinateService.getPage({
      pageParams: {size: this.pageSize, page: this.currentPage},
      sort: {coordinate: 'ASC'},
    }).subscribe((page: PagedResourceCollection<Coordinate>) => {
      this.coordinates = page.resources;
      this.totalCoordinates = page.totalElements;
      this.coordinates.map(coordinate => {
        this.rows.push({coordinate: coordinate.coordinate});
      });
      this.temp = this.rows;
      this.rows = [...this.rows];
      this.loading = false;
      this.tableCoordinates.offset = 0;
    });
  }
}
