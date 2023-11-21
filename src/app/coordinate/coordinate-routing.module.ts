import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoordinateListComponent} from "./coordinate-list/coordinate-list.component";


const routes: Routes = [
  { path: 'coordinates/list', component: CoordinateListComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinateRoutingModule { }
