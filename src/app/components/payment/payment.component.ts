import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerCreditCardService } from 'src/app/services/customer-credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Address } from 'src/app/models/address';
import { BasketDetails } from 'src/app/models/basketDetail';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  order: Order;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationDate: string;
  payment: Payment;
  savedCards: Payment[] = [];
  cardExist: Boolean = false;
  creditCardForm: FormGroup;
  selectedCard: Payment;
  address: Address

  constructor(

    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    private customerCreditCardService: CustomerCreditCardService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private orderService: OrderService

  ) { }

  ngOnInit(): void {
    this.getAddress()
    this.setCreditCardForm();
    this.getSavedCards()

  }
  getAddress() {
    this.address = this.config.data.address
  }

  setCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      savedCards: [""],
      nameOnTheCard: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardCvv: ["", Validators.required],
      expirationDate: ["", Validators.required],
    })
  }

  async payProduct(payment: Payment) {
    if (payment.moneyInTheCard >= 1) {

      this.updateCard(payment)
      this.orderService.addOrder(this.order)
      this.toastrService.success("Ürünü satın aldınız", "Işlem başarılı")
    } else {
      this.toastrService.error("Hata")
    }
  }
  pay() {
    this.orderService.addOrder({
      userId: this.authService.getCurrentUserId(),
      addressId: this.address.id = this.config.data.address.id,
      active:true,
      createDate:new Date,
      count:1,
      orderStatusId:2
    }).subscribe((response) => {
      this.toastrService.success(response.message)
      this.router.navigate(["",800])
    })
  }
  async rent() {
    if (this.creditCardForm.valid) {
      let payment: Payment = Object.assign({}, this.creditCardForm.value)
      this.cardExist = await this.isCardExist(payment)
      if (this.cardExist) {
        let newPayment = await ((this.getFakeCardByCardNumber(this.cardNumber)))
        let wannaSave = await this.isSaved(newPayment)
        if (!wannaSave) {
          this.payProduct(newPayment)
        }
      } else {
        this.toastrService.error("Hesap bilgileriniz onaylanmadı", "Hata")
      }
    } else {
      this.toastrService.error("Formu doldurmanız gerekli", "Hata")
    }

  }

  async isSaved(payment: Payment): Promise<boolean> {
    let result = false
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerCreditCardService.getByCustomerId(customerId).toPromise()).data
    let isContains = customerCards.map(c => c.cardId).includes(payment.id)
    if (!isContains) {
      this.wannaSave(payment)
      result = true
    }
    return result
  }
  wannaSave(payment: Payment) {
    this.confirmationService.confirm({
      message: 'Kartınız sistemde kayıtlı değil kaydetmek ister misiniz?',
      accept: () => {
        this.saveCard(payment)
        this.payProduct(payment)
      },
      reject: () => {
        this.payProduct(payment)
      }
    })
  }
  saveCard(payment: Payment) {
    this.customerCreditCardService.saveCreditCard(payment).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
    });
  }


  saveCreditCard(payment: Payment) {
    this.customerCreditCardService.saveCreditCard(payment).subscribe((response) => {
      this.toastrService.success(response.message, "Kaydedildi")
    })
  }
  async getSavedCards() {
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerCreditCardService.getByCustomerId(customerId).toPromise()).data
    customerCards.forEach(card => {
      this.paymentService.getCardById(card.cardId).subscribe(response => {
        this.savedCards.push(response.data)
      })
    });
  }
  async isCardExist(payment: Payment) {
    return (await this.paymentService.isCardExist(payment).toPromise()).success;
  }
  setCardInfos() {
    this.creditCardForm.patchValue(
      this.selectedCard
    )
  }

  async getFakeCardByCardNumber(cardNumber: string): Promise<Payment> {
    return (await (this.paymentService.getCardByNumber(cardNumber)).toPromise()).data[0]
  }

  updateCard(payment: Payment) {
    this.paymentService.updateCard(payment).subscribe();
  }

}
