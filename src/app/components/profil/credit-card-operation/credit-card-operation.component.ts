import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {DialogService} from 'primeng/dynamicdialog';
import {CustomerCreditCard} from 'src/app/models/customerCard';
import {CustomerCreditCardDetails} from 'src/app/models/customerCreditCardDetails';
import {AuthService} from 'src/app/services/auth.service';
import {CustomerCreditCardService} from 'src/app/services/customer-credit-card.service';
import {PaymentService} from 'src/app/services/payment.service';
import {CreditCardAddComponent} from './credit-card-add/credit-card-add.component';


@Component({
  selector: 'app-credit-card-operation',
  templateUrl: './credit-card-operation.component.html',
  styleUrls: ['./credit-card-operation.component.css']
})
export class CreditCardOperationComponent implements OnInit {

  customerCreditCard: CustomerCreditCardDetails[] = [];

  constructor(private customerCreditCardService: CustomerCreditCardService,
              private paymentService: PaymentService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getCustomerCreditCardByCustomerId();
  }

  getCustomerCreditCardByCustomerId() {
    this.customerCreditCardService.getDetailByCustomerId(this.authService.getCurrentUserId()).subscribe((response) => {
      this.customerCreditCard = response.data;
    });
  }


  deleteCustomerCreditCard(customerCreditCard: CustomerCreditCardDetails) {
    this.customerCreditCardService.deleteCustomerCreditCard(customerCreditCard).subscribe((response) => {
      this.toastrService.success(response.message);
    });
  }

  openComment() {
    const ref = this.dialogService.open(CreditCardAddComponent, {
      header: 'Kredi kartı ekle',
      width: '50%',
    });
  }
}
