import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { ExistGuard } from '../../utils/ExistGuard';

const routes: Routes = [
  { path: '', component: IndexComponent, data: ['user.index'] },
  { path: 'creation', component: CreateComponent, data: ['user.create'] },
  {
    path: 'edit/:nombre',
    canActivate: [ExistGuard],
    component: EditComponent,
    data: ['user.edit'],
  },
  { path: ':nombre', component: ShowComponent, data: ['user.show'] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
