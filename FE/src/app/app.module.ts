import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';;
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DetailComponent } from './pages/detail/detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutClientComponent } from './layout/layout-client/layout-client.component';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppLayoutModule } from './layout/admin/layout/app.layout.module';
import { DasboardComponent } from './pages/admin/dasboard/dasboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ManaProductComponent } from './pages/admin/mana-product/mana-product.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ManacateComponent } from './pages/admin/manacate/manacate.component';
import { FormBuilder } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { ManaFeedbacksComponent } from './pages/admin/mana-feedbacks/mana-feedbacks.component';
import { ManaUsersComponent } from './pages/admin/mana-users/mana-users.component';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    NavbarComponent,
    FooterComponent,
    DetailComponent,
    PageNotFoundComponent,
    LayoutClientComponent,
    DasboardComponent,
    ManaProductComponent,
    ManacateComponent,
    CartComponent,
    ManaFeedbacksComponent,
    ManaUsersComponent,
    UserProfileComponent,
    CheckoutComponent,
    PaymentComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    SelectButtonModule,
    AppLayoutModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    FileUploadModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        // Cấu hình tùy chọn của JWT_OPTIONS nếu cần thiết
      }
    })
  ],
  providers: [JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
