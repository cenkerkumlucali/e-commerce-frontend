import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/services/auth.service';
import {CustomerCreditCardService} from 'src/app/services/customer-credit-card.service';
import {PaymentService} from 'src/app/services/payment.service';
import {Payment} from '../../../../models/payment';

@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.css']
})
export class CreditCardAddComponent implements OnInit {
  creditCardForm: FormGroup;
  paymentId: number;
  cardExist: Boolean = false;
  constructor(private customerCreditCardService: CustomerCreditCardService,
              private paymentService: PaymentService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              ) {
  }

  ngOnInit(): void {
    this.createCreditCardAddForm();
  }

  createCreditCardAddForm() {
    this.creditCardForm = this.formBuilder.group({
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardCvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  async addCreditCard() {
    if (this.creditCardForm.valid) {
      const cardModel = Object.assign({}, this.creditCardForm.value);
      this.cardExist = await this.isCardExist(cardModel);
      if(this.cardExist){
        this.paymentService.addCard(cardModel).subscribe((response) => {
          this.toastrService.success(response.message);
          this.paymentId = response.data;
          this.addCustomerCreditCard();
        }, responseError => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              );
            }
          }
        });
      }else{
        this.toastrService.error('Hesap bilgileriniz onaylanmadı', 'Hata');
      }

    }
  }

  async isCardExist(payment:Payment){
    return (await this.paymentService.isCardExist(payment).toPromise()).success;
  }

  async isSaved(payment: Payment):Promise<boolean>{
  let result = false;
  let customerId = this.authService.getCurrentUserId();
  let customerCard = (await this.customerCreditCardService.getByCustomerId(customerId).toPromise()).data;
  let isContains = customerCard.map(customerCard => customerCard.cardId).includes(payment.id);
  if (!isContains){
    result = true;
  }
  return result;
  }


  addCustomerCreditCard() {
    this.customerCreditCardService.addCustomerCreditCard({
      cardId: this.paymentId,
        customerId: this.authService.getCurrentUserId()
    }).subscribe((response) => {
    });
  }
}
