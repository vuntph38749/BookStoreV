import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutClientComponent } from './layout/layout-client/layout-client.component';
import { AppLayoutComponent } from './layout/admin/layout/app.layout.component';
import { DasboardComponent } from './pages/admin/dasboard/dasboard.component';
import { ManaProductComponent } from './pages/admin/mana-product/mana-product.component';
import { ManacateComponent } from './pages/admin/manacate/manacate.component';
import { CartComponent } from './pages/cart/cart.component';
import { ManaFeedbacksComponent } from './pages/admin/mana-feedbacks/mana-feedbacks.component';
import { ManaUsersComponent } from './pages/admin/mana-users/mana-users.component';
import { MyGuardGuard } from './guards/my-guard.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [MyGuardGuard],
    component: AppLayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DasboardComponent },
      { path: "managementProduct", component: ManaProductComponent },
      { path: "managementCategories", component: ManacateComponent },
      { path: "managementFeedbacks", component: ManaFeedbacksComponent },
      { path: "managementUsers", component: ManaUsersComponent },
    ]
  },
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "cart", component: CartComponent },
      { path: "register", component: RegisterComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: DetailComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'payment', component: PaymentComponent },

    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
