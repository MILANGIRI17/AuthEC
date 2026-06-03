import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  router: Router = inject(Router)
  authService: AuthService = inject(AuthService);

  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/singin');
  }
}
