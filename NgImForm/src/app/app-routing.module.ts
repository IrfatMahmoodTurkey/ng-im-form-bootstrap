import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './modules/form-builder/form-builder.component';
import { BuildedFormComponent } from './modules/builded-form/builded-form.component';

const routes: Routes = [
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    loadChildren: () =>
      import('./modules/form-builder/form-builder.module').then(
        (m) => m.FormBuilderModule
      ),
  },
  {
    path: 'builded-form',
    component: BuildedFormComponent,
    loadChildren: () =>
      import('./modules/builded-form/builded-form.module').then(
        (m) => m.BuildedFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
