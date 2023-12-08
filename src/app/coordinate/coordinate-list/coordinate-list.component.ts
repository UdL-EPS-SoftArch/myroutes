import {Component, OnInit, ViewChild} from '@angular/core';
import {Coordinate} from "../coordinate.entity";
import {Router} from "@angular/router";
import {CoordinateService} from "../coordinate.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {PagedResourceCollection, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-coordinate-list',
  templateUrl: './coordinate-list.component.html',
  styleUrls: ['./coordinate-list.component.scss']
})

export class CoordinateListComponent implements OnInit {
  public coordinates: Coordinate[] = [];
  public pageSize = 5;
  public currentPage = 0;
  public totalCoordinates = 0;
  temp = [];
  @ViewChild(DatatableComponent) tableCoordinates: DatatableComponent;
  loading: boolean = true;
  protected readonly ColumnMode = ColumnMode;
  rows = [
    //{ coordinate: 'test,test' },
    //{ coordinate: '1232131,122312331' },
  ];

  /*columns = [
    //{ prop: 'id', name: 'ID' },
    { prop: 'coordinate', name: 'Coordinate' },
    {name: 'Actions', prop: 'actions', sortable: false, 'template': true}];*/

  constructor(
    public router: Router,
    private coordinateService: CoordinateService,
    private authenticationService: AuthenticationBasicService
  ) {
  }

  ngOnInit() {
    this.getCoordinates();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (val.length == 0) {
      this.getCoordinates();
      return;
    }
    if (val.length <= 3) {
      return;
    }
    this.loading = true;
    this.currentPage = 0;

    this.coordinateService.findByCoordinateContainingIgnoreCase(val).subscribe((collection: ResourceCollection<Coordinate>) => {
      this.coordinates = collection.resources;
      this.totalCoordinates = collection.resources.length;
      this.pageSize = collection.resources.length;
      this.coordinates.map(coordinate => {
        this.rows.push({coordinate: coordinate.coordinate, uri: coordinate.uri});
      });
      // this.temp = this.rows;
      this.rows = [...this.rows];
      this.loading = false;
    });

    /*this.rows = this.temp.filter(function (d) {
      // return d.id.toLowerCase().indexOf(val) !== -1 || !val || d.coordinate.toLowerCase().indexOf(val) !== -1;
      return !val || d.coordinate.toLowerCase().indexOf(val) !== -1;
    });*/
    // this.loading = false;
  }

  setPage(pageInfo: { offset: number; }) {
    this.currentPage = pageInfo.offset;
    this.getCoordinates();
  }

  private getCoordinates() {
    this.loading = true;
    this.pageSize = 10;
    this.rows = [];
    this.coordinateService.getPage({
      pageParams: {size: this.pageSize, page: this.currentPage},
      //sort: {coordinate: 'ASC'},
    }).subscribe((page: PagedResourceCollection<Coordinate>) => {
      this.coordinates = page.resources;
      this.totalCoordinates = page.totalElements;
      this.coordinates.map(coordinate => {
        this.rows.push({coordinate: coordinate.coordinate, uri: coordinate.uri});
      });
      // this.temp = this.rows;
      this.rows = [...this.rows];
      this.loading = false;
    });
  }

  isRole(role: string): boolean {
    // return this.authenticationService.isRole(role);
    return true;
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

}
