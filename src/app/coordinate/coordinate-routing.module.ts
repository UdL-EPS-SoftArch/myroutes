import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoordinateListComponent} from "./coordinate-list/coordinate-list.component";
import {CoordinateCreateComponent} from "./coordinate-create/coordinate-create.component";
import {CoordinateSearchComponent} from "./coordinate-search/coordinate-search.component";
import {CoordinateUpdateComponent} from "./coordinate-update/coordinate-update.component";
import {CoordinateDeleteComponent} from "./coordinate-delete/coordinate-delete.component";
import {CoordinateDetailComponent} from "./coordinate-detail/coordinate-detail.component";


const routes: Routes = [
  {path: 'coordinates', component: CoordinateListComponent},
  {path: 'coordinates/create', component: CoordinateCreateComponent},
  {path: 'coordinates/:id', component: CoordinateDetailComponent},
  {path: 'coordinates/:id/edit', component: CoordinateUpdateComponent},
  {path: 'coordinates/:id/delete', component: CoordinateDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinateRoutingModule {
}
