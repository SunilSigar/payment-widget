import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentService} from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  //fields for credit card form
  name;
  cardNumber;
  month;
  year;
  CVV;
  zip;

  success = false;

  //json mockData
  mockData = [
    {
      "id": "test",
      "name": "Test Method",
      "new_window": false,
      "img_url": "https://api.paymentwall.com/images/ps_logos/pm_dummy.png",
      "img_class": "dummy",
      "ps_type_id": 1
    },
    {
      "id": "qiwiwallet",
      "name": "Qiwi Wallet",
      "new_window": true,
      "img_url": "https://api.paymentwall.com/images/ps_logos/pm_qiwiwallet.png",
      "img_class": "qiwiwallet",
      "ps_type_id": 4
    },
    {
      "id": "mobiamo",
      "name": "Mobiamo",
      "new_window": false,
      "img_url": "https://api.paymentwall.com/images/ps_logos/pm_mobiamo.png",
      "img_class": "mobiamo",
      "ps_type_id": 5
    },
    {
      "id": "mint",
      "name": "MINT",
      "new_window": false,
      "img_url": "https://api.paymentwall.com/images/ps_logos/pm_mint.png",
      "img_class": "mint",
      "ps_type_id": 3
    },
    {
      "id": "evroset",
      "name": "Evroset",
      "new_window": false,
      "img_url": "https://api.paymentwall.com/images/ps_logos/pm_evroset.png",
      "img_class": "evroset",
      "ps_type_id": 3
    },
    {
      "id": "svyasnoi",
      "name": "Svyasnoi",
      "new_window": false,
      "img_url": "https://api.paymentwall.com/images/ps_logos/pm_svyasnoi.png",
      "img_class": "svyasnoi",
      "ps_type_id": 3
    }
  ];

  selectedIndex: number;
  paymentMethodName;
  invalidCardNumber; 
  invalidCVV = false; 

  constructor(private route:ActivatedRoute, private paymentService: PaymentService, private http: HttpClient) { }

  ngOnInit() {
    // this.paymentMethod();
  }

  //return all payment methods
  paymentMethod(){
    //method1
    this.http.get('https://api.paymentwall.com/api/payment-systems/?9263913dd879c33dd285e0b3adc6fb41').subscribe(data => {
      console.log(data);
    });
    //method2
    this.route.params.subscribe(params => {
      this.paymentService.paymentMethods().subscribe(data =>
        { 
                console.log(data);
        });
    });
  }
  
  //trigger when select any payment method
  select(item, index: number) {
      this.selectedIndex = index;
      this.paymentMethodName = item.name;
  }
  
  cardStatus(){
    this.invalidCardNumber = false;
  }
  //check card number with luhn algorithm
  checkLuhn(value){
    let cardNo = value.target.value;
    console.log(cardNo);
    let nDigits = cardNo.length;
    
    let d;
    let nSum = 0;
    let isSecond = false;
    for (let i = nDigits - 1; i >= 0; i--) 
    {
      console.log(cardNo.charAt(i));
        d = Number(cardNo.charAt(i));
        console.log(typeof d);
        console.log(d);
        if (isSecond == true)
            d = d * 2;
 
        //add two digits to handle
        // cases that make two digits 
        // after doubling
        nSum += Math.floor(d / 10);
        nSum += Math.floor(d % 10);
        console.log(nSum);
        isSecond = !isSecond;
    }
    console.log(nSum % 10 == 0);
    if(nDigits != 16){
      this.invalidCardNumber = true;
    }else if(nSum % 10 == 0){
      this.invalidCardNumber = false;
    }else{
      this.invalidCardNumber = true;
    }
  }
  //onSubmit trigger on form submit and check cvv
  onSubmit(myForm){
    console.log(myForm.value);
    if(myForm.value.CVV == 123){
      this.invalidCVV = true;
    }else{
      this.success = true;
      
    }
  }
}
