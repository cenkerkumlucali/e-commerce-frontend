import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { City } from 'src/app/models/city';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { CustomerAddressService } from 'src/app/services/customer-address.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { CustomerAddressDetail } from 'src/app/models/customerAddressDetail';

@Component({
  selector: 'app-address-transactions',
  templateUrl: './address-transactions.component.html',
  styleUrls: ['./address-transactions.component.css']
})
export class AddressTransactionsComponent implements OnInit {

  savedAddress: Address[] = [];
  addresses:Address[]=[]
  cities: City[] = []
  selectedAddress: Address=null;
  address: Address
  addressForm: FormGroup
  user: User = new User()
  email: string;
  currentAddress:Address
  id:number

  
  constructor(private cityService: CityService,
    private authService: AuthService,
    private addressService: AddressService,
    private customerAddressService: CustomerAddressService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.createAddressForm()
    this.getCity()
    this.getSavedAddress()
    this.getAddressByCustomerId()
  }

  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      userId: this.authService.getCurrentUserId(),
      cityId: ["", Validators.required],
      addressDetail: ["", Validators.required],
      addressAbbreviation: ["", Validators.required],
      createDate:[new Date(),Validators.required],
      postalCode: ["1"],
    })
  }
  add() {
    if (this.addressForm.valid) {
      let addressModel = Object.assign({}, this.addressForm.value)
      this.addressService.add(addressModel).subscribe((response) => {
        this.toastrService.success(response.message)
        setTimeout(()=>window.location.reload(),500)
       
      })
    }
  }
  delete(address:Address){
    this.addressService.delete(address).subscribe((response)=>{
      this.toastrService.success(response.message)
      setTimeout(()=>window.location.reload(),500)
    })
  }
  getAddressByCustomerId() {
    this.addressService.getAdressByUserId(this.authService.getCurrentUserId()).subscribe((response) => { 
      this.addresses = response.data 
      console.log(response.data)
    })
  }
  getUserId() {
    this.addressService.getAdressByUserId(this.authService.getCurrentUserId()).subscribe((response) => {
      this.address = response.data[0];
    })
  }
  getCity() {
    this.cityService.get().subscribe(response => {
      this.cities = response.data
    })
  }
  setCardInfos() {
    this.addressForm.patchValue(
      this.selectedAddress
    )
  }
  async getSavedAddress() {
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerAddressService.getByCustomerId(customerId).toPromise()).data
    customerCards.forEach(card => {
      this.addressService.getAddressById(card.addressId).subscribe(response => {
        this.savedAddress.push(response.data)
      })
    });
  }
  setSelectedAddress(address:Address){
    this.selectedAddress = address
  }
 
  setCurrentAddress(address: Address) {
    this.currentAddress = address;
  }
  getCurrentCategoryClass() {
    
      return "list-group-item active"
    
  }
  getProfilEditClass(){
    if(!this.currentAddress){
      return "list-group-item active"
    }else{
      return "list-group-item "
    }
  }
}
