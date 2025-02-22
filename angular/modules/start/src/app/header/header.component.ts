import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../Model/User';
import { Subscription, count } from 'rxjs';
import { counterService } from '../Services/counter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;
  private userSubject: Subscription;
  countService: counterService = inject(counterService)

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      console.log(user)
      this.isLoggedIn = user ? true : false;
    });

    this.countService.increment("headerComponent")
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }
}
