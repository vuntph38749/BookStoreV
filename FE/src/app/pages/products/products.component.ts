import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  cate: string = ''
  categories: any = []
  all_datas: any = []
  datas: any = []
  searchText: string = '';
  typeList: boolean = true

  //panigation
  currentPage: number = 1
  itemsPerpage: number = 4

  // totalsPage:number = Math.ceil(this.all_datas.length/ this.itemsPerpage )

  constructor(private ProductsService: ProductsService, private CategoriesService: CategoriesService, private route: ActivatedRoute, private router: Router) {

  }


  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerpage;
    const endIndex = startIndex + this.itemsPerpage;
    return this.all_datas.slice(startIndex, endIndex);
  }
  get totalPages(): number[] {
    const totalItems = this.all_datas.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerpage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  nextPage() {
    const totalItems = this.all_datas.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerpage);
    if (+this.currentPage + 1 <= +totalPages) {
      this.currentPage = +this.currentPage + 1
    }
  }
  searchFunction() {
    this.datas = this.all_datas.filter((item: any) => {
      return item?.name.toLowerCase().includes(this.searchText.toLocaleLowerCase())
    })
  }
  changePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerpage;
    const endIndex = startIndex + this.itemsPerpage;
    this.datas = this.all_datas.slice(startIndex, endIndex);

  }
  changeListColumn() {
    this.typeList = true
  }
  changeListRow() {
    this.typeList = false
  }

  filterProducts() {

    this.datas = this.all_datas.filter((item: any) => {
      return item?.categoryId?.name === this.cate
    })
  }

  navigateToDetail(productId: string) {
    this.router.navigate(['/', productId]);
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.ProductsService.getProducts().subscribe(
      (response: any) => {
        this.all_datas = response.filter((item: any) => item.status !== "disabled");
        this.changePage()
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )

    this.CategoriesService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.data.filter((item: any) => item.status !== "disabled");
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )

    this.route.queryParams
      .subscribe((params: any) => {
        // console.log(params); // { orderby: "price" }
        this.cate = params?.cate;
        this.currentPage = params?.page || 1
        this.changePage()

        console.log(this.cate); // price
        if (this.cate) {
          this.filterProducts()
        }
      }


      )
  }



}
