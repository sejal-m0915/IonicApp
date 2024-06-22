import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AuthDirective } from './Directives/auth.directive';
import { CustomePipe } from './Pipes/custome.pipe';
import { ValidateDirective } from './Directives/validate.directive';
import { DataTablesModule } from 'angular-datatables'
import { ShareDataService } from './Services/share-data.service';


@NgModule({
  declarations: [AppComponent, AuthDirective, CustomePipe, ValidateDirective],
  imports: [IonicModule.forRoot(), CommonModule, BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  //IonicStorageModule.forRoot()
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ShareDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
