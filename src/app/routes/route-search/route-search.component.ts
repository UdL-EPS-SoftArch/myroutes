import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../../login-basic/user";
import {Route} from "../route";
import {RouteService} from "../route.service";
import {Observable, of, OperatorFunction} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.component.html',
  styleUrls: ['./route-search.component.css']
})
export class RouteSearchComponent {
  @Output() emitResults: EventEmitter<Route> = new EventEmitter();
  searchFailed = false;
  searching = false;

  constructor(private routeService: RouteService) {
  }

  autocomplete: OperatorFunction<string, readonly Route[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 3 ? of([]) :
        this.routeService.findByTitle(term).pipe(
          map((collection: ResourceCollection<Route>) => collection.resources),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false )
    )

  select(item: any): void {
    this.emitResults.emit(item as Route);
  }

}
