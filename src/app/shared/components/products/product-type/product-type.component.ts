import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.css'
})
export class ProductTypeComponent implements OnInit{
  constructor(private _http:HttpClient) { }
  listLoai:any;
  ngOnInit(): void { 
    this._http.get('http://localhost:3000/categories').subscribe(data => {
       this.listLoai=data;
       console.log("Loại sản phẩm: ", data);       
     });
  }
}
