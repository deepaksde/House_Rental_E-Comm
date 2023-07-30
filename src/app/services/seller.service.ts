import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  IsSellerLoggedIn = new BehaviorSubject<boolean>(false);
  LoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    return this.http
      .post('http://localhost:3000/seller', data, { observe: "response" })
      .subscribe((res: any) => {
        if (res) {
          console.warn(res.body);
          this.IsSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(["seller-home"]);
        }
      });
  }

  userLogin(data: Login) {
    console.warn(data);
    return this.http
      .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: "response" }
      ).subscribe((res: any) => {
        if (res && res.body) {
          console.warn("Login : ", res);
          this.IsSellerLoggedIn.next(true);
          console.warn(res.body);
          localStorage.setItem('seller', JSON.stringify(res.body[0]));
          this.router.navigate(["seller-home"]);
        } else {
          this.LoginError.emit(true);
        }
      });
  }


  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.IsSellerLoggedIn.next(true);
      return this.router.navigate(["/seller-home"]);
    }
    return this.router.navigate(["/seller-auth"]);
  }

  CanActivate() {
    if (localStorage.getItem("seller")) return true;
    this.router.navigate(['seller-auth']);
    return false;
  }
}
