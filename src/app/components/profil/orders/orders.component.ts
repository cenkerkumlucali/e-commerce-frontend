import { Component, OnInit } from '@angular/core';
import { OrderDetailDto } from 'src/app/models/orderDetailDto';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderDetailDto:OrderDetailDto[]
  
  defaultImg = ""
  imageBasePath = environment.imageUrl
  constructor(private orderDetailService:OrderDetailService,
              private auhtService:AuthService) { }

  ngOnInit(): void {
    this.getOrderDetailByUserId()
  }

  getOrderDetailByUserId(){
    this.orderDetailService.getOrderDetailByUserId(this.auhtService.getCurrentUserId()).subscribe((response)=>{
      this.orderDetailDto = response.data
    })
  }
  getCurrent(orderDetailDto:OrderDetailDto){
    if(!this.orderDetailDto.findIndex(c=>c.orderStatus==orderDetailDto.orderStatus)){
      return "orderDetailReady"
    }else{
      return "orderDetailWay"
    }
  }
 
}
