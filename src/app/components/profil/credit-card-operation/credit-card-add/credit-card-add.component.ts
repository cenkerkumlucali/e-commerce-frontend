import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerCreditCardService } from 'src/app/services/customer-credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.css']
})
export class CreditCardAddComponent implements OnInit {
  creditCardForm: FormGroup
  paymentId: number
  constructor(private customerCreditCardService: CustomerCreditCardService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this.createCreditCardAddForm()

  }




  createCreditCardAddForm() {
    this.creditCardForm = this.formBuilder.group({
      nameOnTheCard: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardCvv: ["", Validators.required],
      expirationDate: ["", Validators.required],
    })
  }

  addCreditCard() {
    if (this.creditCardForm.valid) {
      let cardModel = Object.assign({}, this.creditCardForm.value)
      this.paymentService.addCard(cardModel).subscribe((response) => {
        this.toastrService.success(response.message)
        this.paymentId = response.data
        this.addCustomerCreditCard()
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {

            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
            )
          }
        }
      })
    }
  }

  addCustomerCreditCard() {
    this.customerCreditCardService.addCustomerCreditCard({
      cardId: this.paymentId,
      customerId: this.authService.getCurrentUserId()
    }).subscribe((response)=>{})
  }
}
