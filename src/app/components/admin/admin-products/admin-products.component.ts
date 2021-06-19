import { ToastrService } from 'ngx-toastr';
import { ProductDetail } from 'src/app/models/productDetail';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  
  products:ProductDetail[]
  product:ProductDetail
  selectedProduct:ProductDetail=null
  imageUrl=environment.imageUrl
  
  constructor(private productService:ProductService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProductDetails().subscribe((response)=>{
      this.products = response.data
      
    })
  }

  deleteProduct(productDetail:ProductDetail){
    this.productService.delete(productDetail).subscribe((response)=>{
      this.toastrService.success(response.message)
    })
  }

  setSelectedProduct(product:ProductDetail){
    this.selectedProduct = product    
    
  }
 
}
