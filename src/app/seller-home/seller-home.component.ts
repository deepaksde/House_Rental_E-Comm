import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  Products: undefined | Product[] = []
  trashIcon = faTrash;
  editIcon = faEdit;

  constructor(private product: ProductsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.listAllProduct();
  }

  listAllProduct() {
    this.product.getAllProductList().subscribe((res: any) => {
      this.Products = res.body;
    })
  }

  deleteProduct(id: number) {
    console.warn(" Id : ", id);
    this.http.
      delete(`http://localhost:3000/products/${id}`, { observe: "response" })
      .subscribe((res) => {
        console.warn("Deleted Successfully : ", res);
        this.listAllProduct();
      })
  }

}
