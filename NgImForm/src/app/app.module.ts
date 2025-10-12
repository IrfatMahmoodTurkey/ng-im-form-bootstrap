import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormPreviewComponent } from './modules/form-preview/form-preview.component';
import { FormBuilderComponent } from './modules/form-builder/form-builder.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: FormBuilderComponent,
        loadChildren: () =>
          import('./modules/form-builder/form-builder.module').then(
            (m) => m.FormBuilderModule
          ),
      },
      {
        path: 'form-build',
        component: FormBuilderComponent,
        loadChildren: () =>
          import('./modules/form-builder/form-builder.module').then(
            (m) => m.FormBuilderModule
          ),
      },
      {
        path: 'form-preview',
        component: FormPreviewComponent,
        loadChildren: () =>
          import('./modules/form-preview/form-preview.module').then(
            (m) => m.FormPreviewModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
