import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {
@Input() addressForUpdate:Address

  savedAddress: Address[] = [];
  cities: City[] = []
  selectedAddress: Address;
  address: Address
  addressForm: FormGroup
  user:User = new User()
  email:string;
  currentAddress:Address={
    id:0,
    userId:this.authService.getCurrentUserId(),
    cityId:0,
    addressDetail:"",
    addressAbbreviation:"",
    postalCode:"",
    createDate:new Date(),
    active:true
  }

  constructor(private cityService:CityService,
    private authService:AuthService,
    private addressService:AddressService,
    private customerAddressService:CustomerAddressService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createAddressForm()
    this.getCity()
    this.email = localStorage.getItem('email')
  }

  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      userId:this.authService.getCurrentUserId(),
      cityId: [this.addressForUpdate?this.addressForUpdate?.cityId:"", Validators.required],
      addressDetail: [this.addressForUpdate?this.addressForUpdate?.addressDetail:"", Validators.required],
      addressAbbreviation:[this.addressForUpdate?this.addressForUpdate.addressAbbreviation:"",Validators.required],
      postalCode: [this.addressForUpdate?this.addressForUpdate.postalCode:"", Validators.required],
    })
  }
  
  ngDoCheck(){
    if ( this.addressForUpdate?.addressDetail !== this.currentAddress?.addressDetail
         && this.addressForUpdate?.addressAbbreviation !== this.currentAddress?.addressAbbreviation
         && this.addressForUpdate?.cityId !== this.currentAddress?.cityId
         && this.addressForUpdate?.postalCode !== this.currentAddress?.postalCode) {
      this.currentAddress.addressDetail= this.addressForUpdate?.addressDetail
      this.currentAddress.addressAbbreviation=this.addressForUpdate?.addressAbbreviation
      this.currentAddress.cityId=this.addressForUpdate?.cityId
      this.currentAddress.postalCode=this.addressForUpdate?.postalCode
      this.addressForm.patchValue({
        cityId:this.currentAddress?.cityId,
        addressDetail:this.currentAddress?.addressDetail,
        addressAbbreviation:this.currentAddress?.addressAbbreviation,
        postalCode:this.currentAddress?.postalCode
      })
    }
  }
  update(){
    if(this.addressForm.valid){
      let addressModel = Object.assign({},this.addressForm.value)
      addressModel.id = this.addressForUpdate.id
      this.addressService.update(addressModel).subscribe((response)=>{
        this.toastrService.success(response.message)
      })
    }
  }
  getUser(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response
        
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
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


}
