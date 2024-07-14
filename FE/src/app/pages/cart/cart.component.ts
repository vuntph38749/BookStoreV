import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartsService } from 'src/app/services/carts/carts.service';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent {
  cart: Array<any> = []
  quantity: number = 1
  total: any
  constructor(private cartService: CartsService, private LocaStoreService: LocaStoreService, private router: Router, private messageService: MessageService) {

  }

  stepDown(item: any) {
    console.log(item)
    if (item.quantity > 1) {
      item.quantity -= 1;

      this.cartService.editCart(item._id, { quantity: item.quantity }).subscribe(
        (response) => {
          console.log(response)
          this.checkTotal(this.cart)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
  stepUp(item: any) {
    item.quantity += 1;
    console.log(item.quantity)
    this.cartService.editCart(item._id, { quantity: item.quantity }).subscribe(
      (response) => {
        console.log(response)
        this.checkTotal(this.cart)
      },
      (error) => {
        console.log(error)
      }
    )
  }
  removeCart(item: any) {
    this.cartService.deleteCart(item._id).subscribe(
      (response) => {
        this.cart = this.cart.filter((data: any) => data._id != item._id)
        this.checkTotal(this.cart)
      },
      (error) => {

      }
    )

  }
  checkTotal(data: any) {
    this.total = data.map((item: any) => {
      if (item.discount > 0) {
        return (item.price * (item.discount / 100)) * item.quantity
      }
      return item.price * item.quantity
    }).reduce((initValue: any, item: any) => item + initValue)
  }
  ngOnInit() {
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response: any) => {
        console.log(response)
        if (!response.accessToken) {
          // this.messageService.add({ severity: 'error', summary: 'Erorr', detail: 'You need to login to show your cart', life: 3000 });
          this.router.navigate(['/login']);
        }
        this.cartService.getcartUser(response.id).subscribe(
          (response: any) => {
            console.log(response)
            this.cart = response.data
            this.checkTotal(this.cart)
            console.log(this.total)

          },
          (error: any) => {
            console.log(error)
          }
        )
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}
