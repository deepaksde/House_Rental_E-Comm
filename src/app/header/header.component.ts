import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = "default";
  sellerName = ""

  constructor(private router: Router, private seller: SellerService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      // console.warn(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          // console.warn("In Seller Area");
          let sellerStorage = localStorage.getItem('seller');
          let sellerData = sellerStorage && JSON.parse(sellerStorage);
          this.sellerName = sellerData.name;
        } else {
          // console.warn("Outside Seller Area");
          if (localStorage.getItem('seller') && this.seller.IsSellerLoggedIn) {
            this.menuType = "seller"
          } else {
            this.menuType = "default";
          }
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('seller');
    this.menuType = "default";
    this.router.navigate(['/']);
  }

}
