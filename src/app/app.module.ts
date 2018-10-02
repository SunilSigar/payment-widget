import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentService } from './payment.service';



@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
      {path:'**',component:PaymentComponent}
    ]),
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
