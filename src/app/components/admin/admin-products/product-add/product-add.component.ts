import { Brand } from '../../../../models/brand';
import { BrandService } from '../../../../services/brand.service';
import { CategoryService } from '../../../../services/category.service';
import { ProductImageService } from '../../../../services/product-image.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  
  productAddForm: FormGroup
  productImageAddForm: FormGroup
  categories: Category[]
  brands: Brand[]
  selectedFile: File = null;
  formData = new FormData();
  productId: number
  constructor(private productService: ProductService,
    private productImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService) { }

  ngOnInit(): void {
    this.setProductForm()
    this.getCategories()
    this.getBrands()
  }
  /*Product Operation Started*/
  setProductForm() {
    this.productAddForm = this.formBuilder.group({
      categoryId: ["", Validators.required],
      brandId: ["", Validators.required],
      name: ["", Validators.required],
      code: ["", Validators.required],
      price: ["", Validators.required],
      rating:[5,""],
      description: ["", Validators.required],
      discountRate: ["", Validators.required],
      images: [""]
    })
  }
  addProduct() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value)
      this.productService.getIdAdd(
        productModel).subscribe((response) => {
          this.productId = response.data
          this.formData.append('productId', this.productId.toPrecision())
          this.productImageService.add(this.formData).subscribe((response) => {
            this.toastrService.success(response.message)
          })
        })
    }
  }
  /*Product Operation Ended*/

  /*Category Operation Started*/
  getCategories() {
    this.categoryService.getCategories().subscribe((response) => { this.categories = response.data })
  }
  /*Category Operation Ended*/

  /*Brand Operation Started*/
  getBrands() {
    this.brandService.getBrands().subscribe((response) => { this.brands = response.data })
  }
  /*Brand Operation Ended*/

  /*Product Image Operation Started*/
  onSelectFile(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      let selectedFile = <File>fileInput.target.files[i];
      this.formData.append('image', selectedFile)
    }
  }
  /*Product Image Operation Ended*/
}
