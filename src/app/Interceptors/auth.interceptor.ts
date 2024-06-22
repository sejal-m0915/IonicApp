import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from "src/environments/environment"
import { AppEnum } from '../Constants/app.enum'
import { StorageService } from '../Services/storage.service';
import { AuthDirective } from '../Directives/auth.directive';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _storage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url == environment.API_Endpoints.AbstractApi) {
            req = req.clone({
                headers: req.headers.set('content-type', 'application/json'),
                setParams: { api_key: AppEnum.AbstracAapi_key }
            });
        } else {

            const __token = this._storage.get("Access_Token");
            if (__token.value != null) {
                req = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${__token.value}`)
                });
            }
            req = req.clone({
                headers: req.headers.set('content-type', 'application/json')
                    .set('Access-Control-Allow-Headers', 'Content-Type')
                    .set('Access-Control-Max-Age', '86400')
                    .set('Access-Control-Allow-Origin', "*")
                    .set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const resDt = AuthDirective.ConvertKeysToUpperCase(event.body)
                    //console.log('Intercept res--->>>', JSON.stringify(event));
                    return event.clone({ body: resDt })
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                const ErrorObj = AuthDirective.ConvertKeysToUpperCase(error.error)
                //console.log('Intercept Error--->>>', JSON.stringify(error));
                return throwError(ErrorObj.ErrorObj);
            }));
    }




}

