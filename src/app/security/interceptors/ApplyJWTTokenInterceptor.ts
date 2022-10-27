import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtInterceptor } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

@Injectable()
export class ApplyJWTTokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("token");

        if (idToken) {
            const authClonedRequest = req.clone({
                headers: req.headers
                    .set('Authorization', `Bearer ${idToken}`)
            });
            return next.handle(authClonedRequest);
        }
        else {
            return next.handle(req);
        }
    }
}


export const JwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
}