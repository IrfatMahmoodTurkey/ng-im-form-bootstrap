import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormBuilderPageComponent } from './pages/form-builder-page/form-builder-page.component';
import { FormPreviewPageComponent } from './pages/form-preview-page/form-preview-page.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: FormBuilderPageComponent,
        loadChildren: () =>
          import('./pages/form-builder-page/form-builder-page.module').then(
            (m) => m.FormBuilderPageModule
          ),
      },
      {
        path: 'form-build',
        component: FormBuilderPageComponent,
        loadChildren: () =>
          import('./pages/form-builder-page/form-builder-page.module').then(
            (m) => m.FormBuilderPageModule
          ),
      },
      {
        path: 'form-preview',
        component: FormPreviewPageComponent,
        loadChildren: () =>
          import('./pages/form-preview-page/form-preview-page.module').then(
            (m) => m.FormPreviewPageModule
          ),
      },
    ]),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
