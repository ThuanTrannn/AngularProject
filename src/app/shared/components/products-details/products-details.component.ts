import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../../interface/products';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  productsDetails: IProducts = {
    id: 0, 
    title: "", 
    price: {
      value: 0,
      currency: ""
    },
    description: "", 
    image: "",
    date: "", 
    category: ""
  };
  idSP: number = 0;
  constructor(
    private _http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.idSP = Number(this.route.snapshot.params['id']);

    this._http.get<IProducts[]>(`http://localhost:3000/products?id=${this.idSP}`).subscribe(data => {
      if (data && data.length > 0) {
        this.productsDetails = data[0];
        console.log(this.productsDetails);
      }
    });
  }
}
