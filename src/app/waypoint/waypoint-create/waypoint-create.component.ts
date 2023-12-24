import {Component, NgModule, OnInit} from '@angular/core';
import { Waypoint } from '../waypoint';
import { Router } from '@angular/router';
import { WaypointService } from '../waypoint.service';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';

import {
  AbstractControl,
  FormControl,
  FormGroup, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

import {RouterModule} from '@angular/router';
import {Coordinate} from "../../coordinate/coordinate.entity";


@Component({
  selector: 'app-waypoint-create',
  templateUrl: './waypoint-create.component.html',
  styleUrls: ['./waypoint-create.component.css'],
})
export class WaypointCreateComponent implements OnInit {
  closeResult = '';
  public isModalSaved: boolean = false;
  public location: Coordinate = new Coordinate();
  public waypoints: Waypoint[] = [];
  public waypoint: Waypoint;
  public titleInput: string = '';
  public selectedWaypoint: String | undefined = undefined;
  public showModal: boolean = false;
  public waypointForm: FormGroup;
  public types: string[] = ['Summit', 'Lake', 'River', 'Waterfall', 'Fountain'];

  constructor(
    private router: Router,
    private waypointService: WaypointService,
    private authenticationService: AuthenticationBasicService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.waypoint = new Waypoint();
    this.waypointForm = new FormGroup({
      title: new FormControl(this.waypoint.title, [
        Validators.required,
        //this.titleValidator(),
      ]),
      description: new FormControl(this.titleInput),
      type: new FormControl(''),
    });

    this.loadWaypointList();
  }

  loadWaypointList() {
    this.waypointService
      .getPage({
        sort: { title: 'ASC' },
      })
      .subscribe((waypoints: PagedResourceCollection<Waypoint>) => {
        this.waypoints = waypoints.resources.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      });
  }


  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveAndClose(modal: any) {
    this.isModalSaved = true;
    modal.close('Save click');
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
    this.waypointService
      .createResource({ body: this.waypoint })
      .subscribe((waypoint: Waypoint) => {
        const uri = (waypoint as any).uri;
        this.router.navigate([uri]).then();
      });
  }
}
