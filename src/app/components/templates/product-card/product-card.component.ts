import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  defaultImg = '';
  imageBasePath = environment.imageUrl;
  url = environment.baseUrl;
  @Input() products: ProductDetail;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toastrService: ToastrService,

  ){}

  addToCart(product: ProductDetail) {
    this.cartService
      .add({
        productId: product.id,
        brandId: product.brandId,
        userId: this.authService.currentUserId,
        count: 1,
      })
      .subscribe((response) => {
        this.toastrService.success(response.message);
      });
  }

}
