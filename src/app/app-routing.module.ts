import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactPageComponent } from './contact-page/contact-page.component';
import { FormComponent } from './form/form.component';
const routes: Routes = [
  { path: 'contact', component: ContactPageComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: 'contact' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
