import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../../interface/products';
import { CartService } from '../../../service/cart.service';
import { ToastrService } from 'ngx-toastr';
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
  idProducts: number = 0;
  listProduct: IProducts[] = [];
  constructor(
    private _http: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService,
  ) {}

  addToCart(product: IProducts) {
    this.cartService.addToCart(product);
    this.toastr.success('Add to cart Success')
  }

  ngOnInit(): void {
    this.idProducts = Number(this.route.snapshot.params['id']);
    this._http.get<IProducts[]>(`http://localhost:3000/products?id=${this.idProducts}`).subscribe(data => {
      if (data && data.length > 0) {
        this.productsDetails = data[0];
      }
    });
  }
}
