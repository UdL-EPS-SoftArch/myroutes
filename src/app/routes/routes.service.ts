import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Routes } from "./routes";

@Injectable({providedIn: "root"})
export class RoutesService extends HateoasResourceOperation<Routes> {

  constructor() {
    super(Routes);
  }

  public findByCreatedBy(creator: string): Observable<ResourceCollection<Routes>> {
    return this.searchCollection("findByCreatedBy", { params: { creator: creator } })
  }

  public findByTitle(title: string): Observable<ResourceCollection<Routes>> {
    return this.searchCollection("findByTitle", { params: { title: title } })
  }
}
