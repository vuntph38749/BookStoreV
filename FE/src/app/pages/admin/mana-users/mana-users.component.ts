import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';

@Component({
  selector: 'app-mana-users',
  templateUrl: './mana-users.component.html',
  styleUrls: ['./mana-users.component.css'],
  providers: [MessageService]
})
export class ManaUsersComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  formData: FormData = new FormData();

  users: any = [];

  user: any = {};

  selectedProducts: any[] = [];

  submitted: boolean = false;

  cols: any[] = [];
  status: any

  dataUp: any
  userInfor:any
  rowsPerPageOptions = [5, 10, 20];
  constructor(
    private MessageService: MessageService,
    private UserService: UsersService,
    private LocaStoreService : LocaStoreService
  ) { }

  ngOnInit() {
    this.status = [
      {
        label: "user"
      },
      {
        label: "admin"
      },
    ]
    this.UserService.getUsers().subscribe(
      (response) => {
        console.log(response)
        this.users = response.data
      },
      (error) => {
        console.log(error)
      }
    )
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response: any) => {
        this.userInfor = response
      }
    )
  }


  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: any) {
    this.user = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.deleteProductDialog = true;
    this.user = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.users = this.users.filter((val: any) => !this.selectedProducts.includes(val));
    this.MessageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.users = this.users.filter((val: any) => val._id !== this.user._id);


  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    console.log(this.user)
    const dataUser = {
      name: this.user.name,
      status: this.user.status,
      role: this.user.role,
    }
    if (this.user.name && this.user.name.length > 6) {
      this.UserService.updateUser(this.user._id, dataUser).subscribe(
        (response) => {
          console.log(response)
          this.users[this.findIndexById(this.user._id)] = this.user
          this.MessageService.add({ severity: 'success', summary: 'Successful', detail: 'Upload product successfully', life: 3000 });

          this.productDialog = false;
        },
        (error) => {
          console.log(error)
        }
      )
    }
    console.log(dataUser)

  }


  ///search for users
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
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
