import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  constructor(private _http:HttpClient) { }
  gamelist: any;
  customOptions: OwlOptions = {
    loop:true,
    autoWidth:true,
    dots: false,
    items:4
  }
  ngOnInit(): void { 
    this._http.get('http://localhost:3000/games').subscribe(data => {
       this.gamelist=data;
       console.log("Loại sản phẩm: ", data);       
     });
  }
}
