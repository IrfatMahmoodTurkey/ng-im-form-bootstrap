import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormBuilderModule } from './modules/form-builder/form-builder.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormBuilderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
