import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ListProducts } from '../../../interface/listproducts';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  products: any[];
  trendingProducts: any[];
  saleProducts: any[];
  sellingProducts: any[];
  expensiveProducts: any[];
  customOptions: OwlOptions = {
    loop:true,
    margin: 10,
    dots: true,
    items:1
  }
  constructor(private _http: HttpClient) { 
    this.products = [];
    this.trendingProducts = [];
    this.saleProducts = [];
    this.sellingProducts = [];
    this.expensiveProducts = [];
  }
  
  ngOnInit(): void {
    this._http.get<ListProducts[]>('http://localhost:3000/products').subscribe(data => {
      const productsData: ListProducts[][] = [data]
      this.trendingProducts = productsData[0].filter(product => product.category === 'trending');
      this.saleProducts = productsData[0].filter(product =>  product.category === 'sale');
      this.sellingProducts = productsData[0].filter(product =>  product.category === 'selling-products');
      this.expensiveProducts = productsData[0].filter(product =>  product.category === 'Expensive Products');
    });
  }
}
