import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] | undefined;
  constructor(private ProductsService: ProductsService, private route: ActivatedRoute, private router: Router) {

  }
  pricehigh: any;
  newProduct: any[] | undefined;

  getProducts() {
    this.ProductsService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
        console.log(response);
        this.pricehigh = response.sort((a: any, b: any) => {
          return b.price - a.price
        }).slice(0, 4)
        this.newProduct =  response.slice(-4)
        // const randomIndexes: number[] = [];
        // while (randomIndexes.length < 4) {
        //   const randomIndex = Math.floor(Math.random() * response.length);
        //   if (!randomIndexes.includes(randomIndex)) {
        //     randomIndexes.push(randomIndex);
        //   }
        // }

        // this.randomProducts = randomIndexes.map(index => response[index]);
        // console.log(this.randomProducts);
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getProducts();
  }
}
