import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {

  constructor(private http: Http) { }
  //return payment methods
  paymentMethods():Observable<string>{
    return this.http.get('https://api.paymentwall.com/api/payment-systems/?9263913dd879c33dd285e0b3adc6fb41').map((res: Response) => res.json());
   }


}
