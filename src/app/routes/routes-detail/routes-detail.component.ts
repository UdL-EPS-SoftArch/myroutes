import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesService} from "../routes.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";

@Component({
  selector: 'app-routes-detail',
  templateUrl: './routes-detail.component.html',
  styleUrls: ['./routes-detail.component.css']
})
export class RoutesDetailComponent implements OnInit {
  public routes: Routes = new Routes();
  public pageSize = 5;
  public page = 1;
  public totalRatings = 0;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private routesService: RoutesService,
    private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.routesService.getResource(id).pipe(
      switchMap(r => {
        this.routes = r;
        return this.routes.getRelation<User>('about');
      }),
      switchMap((user: User) => {
        this.routes.about = user;
        return this.routes.getRelation<User>('author');
      })
    ).subscribe(user => {
      this.routes.author = user;
    });

  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

  currentUserEdit(){
    return this.getCurrentUserName() == this.routes.author.id;
  }

}
