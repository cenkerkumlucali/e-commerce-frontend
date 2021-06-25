import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {AddressService} from 'src/app/services/address.service';
import {CityService} from 'src/app/services/city.service';
import {environment} from 'src/environments/environment';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {City} from 'src/app/models/city';
import {Address} from 'src/app/models/address';
import {AuthService} from 'src/app/services/auth.service';
import {CustomerAddressService} from 'src/app/services/customer-address.service';
import {DialogService} from 'primeng/dynamicdialog';
import {PaymentComponent} from '../payment/payment.component';
import {BasketDetails} from 'src/app/models/basketDetail';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  savedAddress: Address[] = [];
  cities: City[] = [];
  selectedAddress: Address;
  address: Address;
  imageBasePath = environment.imageUrl;
  defaultImg = '/images/default.jpg';
  createAddressForm: FormGroup;
  basketDetail: BasketDetails[];
  addressId: number;

  constructor(
    private addressService: AddressService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private customerAddressService: CustomerAddressService,
    private dialogService: DialogService,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.getCity();
    this.setCreditCardForm();
    this.getSavedCards();
    this.getDetailUserId();
  }


  setCreditCardForm() {
    this.createAddressForm = this.formBuilder.group({
      savedAddress: [''],
      cityId: ['', Validators.required],
      addressDetail: ['', Validators.required],
      addressAbbreviation: ['', Validators.required],
      userId: [this.authService.getCurrentUserId()],
      postalCode: ['1', Validators.required],
    });
  }

  buy() {
        this.addressService.getAdressByUserId(this.authService.getCurrentUserId()).subscribe((response) => {
        this.address = response.data[0];
        this.openCreditCard();
      });
        if (this.address){
        this.add();
        this.addressService.getAdressByUserId(this.authService.getCurrentUserId()).subscribe((response) => {
        this.address = response.data[0];
      });
    }
  }

  add() {
    const addressModel = Object.assign({}, this.createAddressForm.value);
    this.addressService.getIdAdd(addressModel).subscribe((response) => {
      this.address.id = response.data;
      this.addCustomerAddress();
      this.openCreditCard();
    });
  }

  addCustomerAddress() {
    this.customerAddressService.addCustomerAddress({
      addressId: this.address.id,
      customerId: this.authService.getCurrentUserId()
    }).subscribe((response) => {});
  }

  getCity() {
    this.cityService.get().subscribe(response => {
      this.cities = response.data;
    });
  }

  setCardInfos() {
    this.createAddressForm.patchValue(
      this.selectedAddress
    );
  }

  getDetailUserId() {
    this.cartService.getDetailsUserId(this.authService.currentUserId).subscribe((response) => {
      this.basketDetail = response.data;
    });
  }

  async getSavedCards() {
    const customerId = this.authService.getCurrentUserId();
    const customerCards = (await this.customerAddressService.getByCustomerId(customerId).toPromise()).data;
    customerCards.forEach(card => {
      this.addressService.getAddressById(card.addressId).subscribe(response => {
        this.savedAddress.push(response.data);
      });
    });
  }

  openCreditCard() {
    const ref = this.dialogService.open(PaymentComponent, {
      data: {
        address: this.address,
        basketDetail: this.basketDetail
      },
      header: 'Kart bilgileri',
      width: '40%'
    });
  }

}
