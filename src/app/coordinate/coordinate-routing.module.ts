import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoordinateListComponent} from "./coordinate-list/coordinate-list.component";
import {CoordinateCreateComponent} from "./coordinate-create/coordinate-create.component";
import {CoordinateUpdateComponent} from "./coordinate-update/coordinate-update.component";
import {CoordinateDeleteComponent} from "./coordinate-delete/coordinate-delete.component";
import {CoordinateDetailComponent} from "./coordinate-detail/coordinate-detail.component";


const routes: Routes = [
  {path: '', component: CoordinateListComponent},
  {path: 'create', component: CoordinateCreateComponent},
  {path: ':id', component: CoordinateDetailComponent},
  {path: ':id/edit', component: CoordinateUpdateComponent},
  {path: ':id/delete', component: CoordinateDeleteComponent},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinateRoutingModule {
}
