import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LoaderComponent } from './component/loader/loader.component';
import { LoaderIntInterceptor } from './component/loader/loader-int.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    NgxSpinnerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderIntInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
