import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts/carts.service';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Array<any> = []
  total: any

  constructor(private cartsService: CartsService, private LocaStoreService: LocaStoreService) { }

  ngOnInit(): void {
    this.LocaStoreService.getStore("userInfor").pipe(
      map((userInfor: any) => userInfor.id)
    ).subscribe(
      (userId: string) => {
        if (userId) {
          this.loadCartItems(userId);
        } else {
          // Xử lý khi không có user ID
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCartItems(userId: string): void {
    // Gọi service để lấy thông tin giỏ hàng
    this.cartsService.getcartUser(userId).subscribe(
      (response: any) => {
        this.checkTotal(this.cart)
        console.log(response);

      },
      (error) => {
        console.log(error);
      }
    );
  }
  checkTotal(data: any) {
    this.total = data.map((item: any) => {
      if (item.discount > 0) {
        return (item.price * (item.discount / 100)) * item.quantity
      }
      return item.price * item.quantity
    }).reduce((initValue: any, item: any) => item + initValue)
  }

  calculateTotal(): number {
    // Thực hiện tính toán tổng số tiền dựa trên giỏ hàng
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  placeOrder(): void {
    // Gọi service để thực hiện đặt hàng (cần phải thực hiện logic thực tế)
    // this.cartsService.placeOrder(/* pass appropriate data if needed */).subscribe(
    //   (response) => {
    //     console.log('Order placed successfully!');
    //   },
    //   (error) => {
    //     console.log('Error placing order:', error);
    //   }
    // );
  }
}
