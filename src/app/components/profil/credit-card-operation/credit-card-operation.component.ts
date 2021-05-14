import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerCreditCard } from 'src/app/models/customerCard';
import { CustomerCreditCardDetails } from 'src/app/models/customerCreditCardDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerCreditCardService } from 'src/app/services/customer-credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-credit-card-operation',
  templateUrl: './credit-card-operation.component.html',
  styleUrls: ['./credit-card-operation.component.css']
})
export class CreditCardOperationComponent implements OnInit {
  creditCardForm:FormGroup
  customerCreditCard:CustomerCreditCardDetails[]=[]
  constructor(private customerCreditCardService:CustomerCreditCardService,
              private paymentService:PaymentService,
              private authService:AuthService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder) { }

  ngOnInit( ): void {
    this.createCreditCardAddForm()
    this.getCustomerCreditCardByCustomerId()
  }
  getCustomerCreditCardByCustomerId(){
    this.customerCreditCardService.getDetailByCustomerId(this.authService.getCurrentUserId()).subscribe((response)=>{
      this.customerCreditCard = response.data
      console.log(response.data)
    })
  }
  createCreditCardAddForm(){
   this.creditCardForm =this.formBuilder.group({
    nameOnTheCard: ["", Validators.required],
    cardNumber: ["", Validators.required],
    cardCvv: ["", Validators.required],
    expirationDate: ["", Validators.required],
   })
  }

  addCreditCard(){
    if(this.creditCardForm.valid){
      let cardModel = Object.assign({},this.creditCardForm.value)
      this.paymentService.addCard(cardModel).subscribe((response)=>{
        this.toastrService.success(response.message)
      },responseError=>{
        if(responseError.error.Errors.length>0){
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {

          this.toastrService.error(responseError.error.Errors[i].ErrorMessage
            )
          }
        }
    })
    }
  }

  deleteCustomerCreditCard(customerCreditCard:CustomerCreditCard){
    this.customerCreditCardService.deleteCustomerCreditCard(customerCreditCard).subscribe((response)=>{
      this.toastrService.error(response.message)
    })
  }
}
