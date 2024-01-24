import {Component, OnInit} from '@angular/core';
import {Waypoint} from '../waypoint';
import {Router} from '@angular/router';
import {WaypointService} from '../waypoint.service';
import {AuthenticationBasicService} from 'src/app/login-basic/authentication-basic.service';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PagedResourceCollection} from '@lagoshny/ngx-hateoas-client';
import {Coordinate} from "../../coordinate/coordinate.entity";
import {CoordinateService} from "../../coordinate/coordinate.service";

@Component({
  selector: 'app-waypoint-create',
  templateUrl: './waypoint-create.component.html',
  styleUrls: ['./waypoint-create.component.css'],
})
export class WaypointCreateComponent implements OnInit {
  closeResult = '';
  public isModalSaved: boolean = false;
  public coordinates: Coordinate[] = [];
  public waypoints: Waypoint[] = [];
  public waypoint: Waypoint;
  public titleInput: string = '';
  public selectedWaypoint: String | undefined = undefined;
  public showModal: boolean = false;
  public waypointForm: FormGroup;
  public types: string[] = ['Summit', 'Lake', 'River', 'Waterfall', 'Fountain',
    'Cave', 'Risk', 'Valley', 'Panoramic view', 'Wildlife observation', 'Parking',
    'Cliff', 'Shelter', 'Other'];

  constructor(
    private router: Router,
    private waypointService: WaypointService,
    private authenticationService: AuthenticationBasicService,
    private modalService: NgbModal,
    private coordinateService: CoordinateService
  ) {
  }

  ngOnInit(): void {
    this.waypoint = new Waypoint();
    this.waypointForm = new FormGroup({
      title: new FormControl(this.waypoint.title, [
        Validators.required
      ]),
      description: new FormControl(this.titleInput),
      type: new FormControl(''),
      locate: new FormControl(''),
    });
    this.loadCoordinateList();
    this.loadWaypointList();
  }

  loadCoordinateList() {
    this.coordinateService.getPage({ pageParams:  { size: 10 }, sort: { name: 'ASC' } })
      .subscribe((coordinates: PagedResourceCollection<Coordinate>) => {
        this.coordinates = coordinates.resources;
      });
  }

  loadWaypointList() {
    this.waypointService
      .getPage({
        sort: {title: 'ASC'},
      })
      .subscribe((waypoints: PagedResourceCollection<Waypoint>) => {
        this.waypoints = waypoints.resources.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      });
  }

  get title() {
    return this.waypointForm.get('title');
  }

  get description() {
    return this.waypointForm.get('description');
  }

  onSubmit(): void {
    this.waypoint.title = this.title?.value;
    this.waypoint.type = this.waypointForm.get('type')?.value;
    this.waypoint.description = this.description?.value;
    this.waypoint.location = this.waypointForm.get('locate')?.value;

    this.waypointService
      .createResource({body: this.waypoint})
      .subscribe(() => {
        this.router.navigate(['/waypoints']).then();
      });
  }
}
