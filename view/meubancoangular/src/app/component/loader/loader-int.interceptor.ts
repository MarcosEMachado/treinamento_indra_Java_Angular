import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderComponent } from './loader.component';


@Injectable()
export class LoaderIntInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderComponent) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ///caregando o loading
    this.loader.show();
    return next.handle(request).pipe(finalize(() => this.loader.hide()));
  }
}
