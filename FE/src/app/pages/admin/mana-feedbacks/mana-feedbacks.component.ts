import { FeedbacksService } from './../../../services/feedbacks/feedbacks.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mana-feedbacks',
  templateUrl: './mana-feedbacks.component.html',
  styleUrls: ['./mana-feedbacks.component.css'],
  providers: [MessageService]
})
export class ManaFeedbacksComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  formData: FormData = new FormData();

  feedbacks: any = [];

  feedback: any = {};

  selectedProducts: any[] = [];

  submitted: boolean = false;

  cols: any[] = [];


  dataUp: any
  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private FeedbacksService: FeedbacksService
    ){}

  ngOnInit(){
    this.FeedbacksService.getAllFeedbacks().subscribe(
      (response)=>{
        console.log(response)
        this.feedbacks = response
      },
      (error)=>{
        console.log(error)
      }
    )
  }


  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: any) {
    this.feedback = { ...product };
  }

  deleteProduct(product: any) {
    this.deleteProductDialog = true;
    this.feedback = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.feedbacks = this.feedbacks.filter((val:any) => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.feedbacks = this.feedbacks.filter((val:any) => val._id !== this.feedback._id);
    this.FeedbacksService.deleteFeedback(this.feedback._id).subscribe(
      (response)=>{
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Delete Deleted', life: 3000 });

      },
      (error)=>{
        console.log(error)
      }
    )
   
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    
  }


  ///search for feedbacks
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.feedbacks.length; i++) {
      if (this.feedbacks[i]._id === id) {
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
