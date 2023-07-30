import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private router: Router) { }

  addProductIntoDB(data: Product) {
    console.warn("Product Service : ", data);
    return this.http
      .post('http://localhost:3000/products', data, { observe: "response" })
      .subscribe((res) => {
        console.warn("Response : ", res);
        if (res) {
          this.router.navigate(["seller-home"]);
        }
      });
  }

  getAllProductList() {
    return this.http
      .get<Product[]>("http://localhost:3000/products", { observe: "response" });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`, { observe: "response" });
  }

  updateProduct(data: Product) {
    return this.http.put(`http://localhost:3000/products/${data.id}`, data, { observe: "response" });
  }

}
