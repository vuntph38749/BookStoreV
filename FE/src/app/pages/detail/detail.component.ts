import { FeedbacksService } from './../../services/feedbacks/feedbacks.service';
import { CartsService } from './../../services/carts/carts.service';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios'
import { IProduct } from 'src/common/product';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string = '';
  product: any = {}
  relateProducts: any[] = []
  all_datas: [] = []
  currentImg: string = this.product.img
  quantity: any = 1
  value: number = 0;
  feedBack: string = ''
  submitted: boolean = false
  inforUser:any
  feedbacks: any = []
  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService,
    private LocaStoreService: LocaStoreService,
    private router: Router,
    private CartsService: CartsService,
    private FeedbacksService: FeedbacksService

  ) { }

  changeImage(imgChoice: any) {
    this.currentImg = imgChoice
  }
  getRateArray(rate: number): number[] {
    return Array(rate).fill(0);
  }
  submitFeedback() {
    this.submitted = true
   if(this.inforUser.accessToken){
     const data = {
       rate: this.value,
       content: this.feedBack,
       user:this.inforUser.id,
       product:this.product._id,
       name:this.inforUser.name
     }

     this.FeedbacksService.addfeedbackOfProduct(data).subscribe(
      (response)=>{
        console.log(response)
        this.feedBack = '',
        this.value = 0
        this.submitted = false
        this.feedbacks.unshift(data)
      },
      (error)=>{
        console.log(error)
      }
     )
   }


  }

  addToCart() {
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response) => {
        // console.log(response)
        if (!response.accessToken) {
          this.router.navigate(['/login'])
        }
        const dataCart = {
          name: this.product.name,
          discount: this.product.discount,
          img: this.product.img,
          product: this.product._id,
          userId: response.id,
          quantity: this.quantity,
          price: this.product.price
        }
        this.CartsService.addToCart(dataCart).subscribe(
          (response2: any) => {
            // console.log(response2)
            this.CartsService.getcartUser(response.id).subscribe(
              (response: any) => {
                localStorage.setItem("cart", JSON.stringify(response.data))
                this.router.navigate(['/cart'])
              },
              (error: any) => {
                console.log(error)
              }
            )
          },
          (error) => {
            console.log(error)
          }
        )

      },
      (error) => {
        console.log(error)
      }
    )


  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProductById();

    });
    this.ProductsService.getProducts().subscribe(
      (response: any) => {
        this.all_datas = response;
        this.getRelateProducts()
      },
      (error: any) => {
        console.log(error);
      }
    )

    this.LocaStoreService.getStore("userInfor").subscribe(
      (response) => {
        // console.log(response)
        this.inforUser = response
        
      },
      (error) => {
        console.log(error)
      }
    )

    this.FeedbacksService.getFeedbackOfProduct(this.id).subscribe(
      (response:any) => {
        console.log(response)
        this.feedbacks = response.filter((item:any)=>item.status!=='disabled')
      },
      (error)=>{
        console.log(error)
      }
    )




  }
  getRelateProducts() {
    // console.log(this.all_datas, this.product)
    this.relateProducts = this.all_datas.filter((item: any) => {
      return item?.categoryId?._id === this.product?.categoryId?._id && item?._id !== this.product?._id
    })
    // console.log(this.relateProducts)
  }
  getProductById() {
    this.ProductsService.getProduct(this.id).subscribe(
      (response) => {
        // console.log(response)
        this.product = response.data
        this.getRelateProducts()
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
