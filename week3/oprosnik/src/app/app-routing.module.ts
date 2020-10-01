import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignComponent } from './sign/sign.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { CreaterComponent } from './creater/creater.component';
const routes: Routes = [
  { path: '', component: SignComponent },
  { path: 'test', component: TestComponent },
  { path: 'result', component: ResultComponent },
  { path: 'create', component: CreaterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
