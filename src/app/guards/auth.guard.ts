import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ACCESS_TOKEN_KEY, StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}
  canActivate(): Observable<boolean> {
    return from(this.storageService.getValue(ACCESS_TOKEN_KEY)).pipe(
      map((token) => !!token),
      tap((hasToken) => {
        console.log('hasToken: ', hasToken);
        if (!hasToken) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
