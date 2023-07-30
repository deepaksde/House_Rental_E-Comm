import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SignUp } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  IsLoggedIn: boolean = false;
  ErrorMsg: string = "";

  constructor(private seller: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  login(data: SignUp): void {
    // console.warn(data);
    this.ErrorMsg = "";
    this.seller.userLogin(data);
    this.seller.LoginError.subscribe((error) => {
      this.ErrorMsg = "Email or Password is incorrect";
    })
  }

  showLogin() {
    this.IsLoggedIn = true;
  }

  showSignUp() {
    this.IsLoggedIn = false;
  }



}
