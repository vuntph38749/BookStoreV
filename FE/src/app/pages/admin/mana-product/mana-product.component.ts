import { UploadImgService } from './../../../services/upload/upload-img.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/categories/categories.service';
@Component({
  selector: 'app-mana-product',
  templateUrl: './mana-product.component.html',
  styleUrls: ['./mana-product.component.css'],
  providers: [MessageService]
})
export class ManaProductComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  formData: FormData = new FormData();

  products: any[] = [];

  product: any = {};

  files: any = []

  selectedProducts: any[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  category: any = ''

  categories: any[] = [];
  
  dataUp: any
  rowsPerPageOptions = [5, 10, 20];
  constructor(private UploadImgService: UploadImgService, private ProductsService: ProductsService, private CategoriesService: CategoriesService, private messageService: MessageService) { }
  ngOnInit() {
    this.ProductsService.getProducts().subscribe(
      (response) => {
        this.products = response
        console.log(response)
        
      },
      (error)=>{
        console.log(error)
        
      }
    )
    this.CategoriesService.getAllCategories().subscribe(
      (response: any) => {
        console.log(response.data)
        this.categories = response.data.map((item: any) => {
          return { label: item.name, value: item._id }
        })
      }
    )


  }
  openNew() {
    this.product = {};
    this.category = ''
    console.log(this.product)
    this.submitted = false;
    this.productDialog = true;
  }

  onChangeFile(event: any) {
    for (let i = 0; i < event.files.length; i++) {
      this.formData.append('files', event.files[i], event.files[i].name);

    }

  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.category = product?.categoryId?.name
    this.productDialog = true;

  }

  deleteProduct(product: any) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter(val => val._id !== this.product._id);
    this.ProductsService.deleteProduct(this.product._id).subscribe(
      (response)=>{
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.formData = new FormData();
  }
  saveProduct() {
    this.submitted = true;
    // console.log(this.category)

    if (this.product._id) {
      console.log(this.formData.getAll("files"))
      this.UploadImgService.Upload(this.formData).subscribe(
        (response) => {
          this.dataUp = {
            name: this.product.name,
            price: this.product.price,
            description: this.product.description,
            categoryId: this.category && this.categories.filter((item: any) => item.label === this.category)[0].value,
            imgs: response?.secure_urls,
            discount: this.product.discount,
            status: this.product.status
          }
          this.ProductsService.updateProduct(`${this.product._id}`, this.dataUp).subscribe(
            (response1) => {
              console.log(response?.secure_urls)
              console.log(this.product)
              this.products[this.findIndexById(this.product._id)] = {
                ...this.dataUp,
                categoryId: {
                  _id: response1.data.categoryId,
                  name: this.category && this.categories.filter((item: any) => item.label === this.category)[0].label
                },
                imgs: response1.data.imgs,
                img: response1.data.img,
                _id: this.product._id,
              }
              this.formData = new FormData()
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Upload product successfully', life: 3000 });

              // console.log(this.findIndexById(this.product._id))
              console.log(response1)
              this.productDialog = false;
            },
            (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });

              console.log(error)
            }
          )
        },
        (error) => {
          console.log(error)
        }
      )
      
    } else {
      this.UploadImgService.Upload(this.formData).subscribe(
        (response) => {
          if (!response?.secure_urls.length) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "You need to upload Img" });

          }
          console.log(response?.secure_urls)
          this.dataUp = {
            ...this.product,
            categoryId: this.category && this.categories.filter((item: any) => item.label === this.category)[0].value,
            imgs: response?.secure_urls
          }
          console.log(this.dataUp)
          this.ProductsService.createProduct(this.dataUp).subscribe(
            (response: any) => {
              this.formData = new FormData();
              console.log(response)
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Upload product successfully', life: 3000 });
              this.ProductsService.getProducts().subscribe(
                (responseData) => {
                  this.products = responseData
                  // console.log(response)
                  this.productDialog = false;
                }
              )
            },
            (error: any) => {
              console.log(error)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
          )
        },
        (error) => {
          console.log(error)
        }
      )

    }




  }


  ///search for products
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }



  onGlobalFilter(table: any, event: any) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
