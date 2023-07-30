import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private product: ProductsService) { }

  ngOnInit(): void {

  }

  addProduct(data: Product) {
    // console.warn("Product : ", data);
    this.product.addProductIntoDB(data);
  }


}
