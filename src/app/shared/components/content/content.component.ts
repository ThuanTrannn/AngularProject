import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  constructor(private _http: HttpClient) { }
  listProducts: any;
  sellingProducts: any;
  expensiveProducts: any;
  customOptions: OwlOptions = {
    loop:true,
    autoWidth:true,
    margin: 10,
    dots: true,
    items:1
  }
  
  ngOnInit(): void {
    this._http.get('http://localhost:3000/trending').subscribe(data => {
      this.listProducts = data;
    });
    this._http.get('http://localhost:3000/selling-products').subscribe(data => {
      this.sellingProducts = data;
    });
    this._http.get('http://localhost:3000/expensive-goods').subscribe(data => {
      this.expensiveProducts = data;
    });
  }
}
