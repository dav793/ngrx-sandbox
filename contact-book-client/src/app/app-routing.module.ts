import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContactViewComponent} from "./contact/contact-view/contact-view.component";

const routes: Routes = [
  { path: 'contact/:id', component: ContactViewComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
