import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export class APP_ROUTE {
  public static readonly MAIN = '';
  public static readonly AUTHORIZATION = 'users:auth';
  public static readonly AUTHORIZATION_COMPLETE = 'users:new';
}

const routes: Routes = [
  {
    path: APP_ROUTE.MAIN,
    loadChildren: () => import('@app/admin/admin.module').then(m => m.AdminModule),
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
