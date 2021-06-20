import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DialogService} from 'primeng/dynamicdialog';
import {BasketDetails} from 'src/app/models/basketDetail';
import {Cart} from 'src/app/models/cart';
import {Product} from 'src/app/models/product';
import {ProductDetail} from 'src/app/models/productDetail';
import {User} from 'src/app/models/user';
import {AuthService} from 'src/app/services/auth.service';
import {CartService} from 'src/app/services/cart.service';
import {environment} from 'src/environments/environment';
import {PaymentInformationComponent} from '../payment-information/payment-information.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart[] = [];
  cart: Cart;
  product: Product;
  user: User = new User();
  basketDetail: BasketDetails[] = [];
  basket: BasketDetails;
  imageBasePath = environment.imageUrl;
  defaultImg = '';

  constructor(private cartService: CartService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getDetailUserId();

  }

  delete(basketDetail: BasketDetails) {
    this.cartService.delete({
      id: basketDetail.id
    }).subscribe((response) => {
      this.toastrService.success(response.message);
      this.router.navigate([window.location.reload(), 800]);
    });
  }

  getDetailUserId() {
    this.cartService.getDetailsUserId(this.authService.currentUserId).subscribe((response) => {
      this.basketDetail = response.data;
      this.basketDetail.forEach(basket => {
        basket.price = basket.price * basket.count;
      });
    });
  }

  get totalPrice() {
    let total = 0;
    for (let b of this.basketDetail) {
      total += b.price;
    }
    return Math.round(total * 100) / 100;
  }

  openCreditCard() {
    const ref = this.dialogService.open(PaymentInformationComponent, {
      data: {
        basketDetail: this.basketDetail
      },
      header: 'Adres bilgileri',
      width: '45%'
    });
    console.log(this.basketDetail);
  }
}
