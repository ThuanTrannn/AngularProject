import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListProducts } from '../../../interface/listproducts';
import { IProducts } from '../../../interface/products';
import { CartService } from '../../../service/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent {
  allProducts: ListProducts[] = [];
  currentPage: number = 1;
  productsPerPage: number = 6;
  categories: string[] = [];
  constructor(
    private _http: HttpClient,
    private cartService: CartService,
    private toastr: ToastrService
    ) { }
  ngOnInit(): void {
    this._http.get<ListProducts[]>('http://localhost:3000/products').subscribe(data => {
      this.allProducts = data;
      this.extractCategories();
    });
  }
  getPaginatedProducts(): ListProducts[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    return this.allProducts.slice(startIndex, startIndex + this.productsPerPage);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  extractCategories(): void {
    this.categories = [...new Set(this.allProducts.map(product => product.category))];
  }
  addToCart(product: IProducts) {
    this.cartService.addToCart(product);
    console.log(this.cartService)
    this.toastr.success('Add to cart Success')
  }
}
