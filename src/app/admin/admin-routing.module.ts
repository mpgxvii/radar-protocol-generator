import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardPageComponent} from "@app/admin/containers/dashboard-page/dashboard-page.component";

export class ADMIN_ROUTE {
  public static readonly MAIN = '';
}

const routes: Routes = [
  {
    path: ADMIN_ROUTE.MAIN,
    component: DashboardPageComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
