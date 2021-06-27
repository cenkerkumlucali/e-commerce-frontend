import {ProductImage} from './../../../../models/productImage';
import {ProductImageService} from './../../../../services/product-image.service';
import {Product} from './../../../../models/product';
import {ProductDetail} from 'src/app/models/productDetail';
import {Brand} from './../../../../models/brand';
import {BrandService} from './../../../../services/brand.service';
import {CategoryService} from './../../../../services/category.service';
import {ProductService} from 'src/app/services/product.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Category} from 'src/app/models/category';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input() productForUpdate: ProductDetail;

  productUpdateForm: FormGroup;
  categories: Category[];
  brands: Brand[];
  formData = new FormData();
  imageUrl = environment.imageUrl;
  defaultImg = '';
  currentProduct: Product = {
    id: 0,
    categoryId: 0,
    brandId: 0,
    name: '',
    code: '',
    price: 0,
    rating: 0,
    description: ''
  };
  selectedProduct: Product;

  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private brandService: BrandService,
              private productImageService: ProductImageService) {
  }

  ngOnInit(): void {
    this.setProductForm();
    this.getCategories();
    this.getBrands();
  }

  setProductForm() {
    this.productUpdateForm = this.formBuilder.group({
      brandId: [this.productForUpdate ? this.productForUpdate.brandId : '', Validators.required],
      categoryId: [this.productForUpdate ? this.productForUpdate.categoryId : '', Validators.required],
      name: [this.productForUpdate ? this.productForUpdate.productName : '', Validators.required],
      description: [this.productForUpdate ? this.productForUpdate.description : '', Validators.required],
      code: [this.productForUpdate ? this.productForUpdate.code : '', Validators.required],
      price: [this.productForUpdate ? this.productForUpdate.price : '', Validators.required],
      discountRate: [this.productForUpdate ? this.productForUpdate.discountRate : '', Validators.required],
      image: ['']
    });
  }

  update() {
    let productModel: Product = Object.assign({}, this.productUpdateForm.value);
    productModel.id = this.productForUpdate.id;
    this.productService.update(productModel).subscribe((response) => {
      this.toastrService.success(response.message);
      this.addProductImage();
    });
  }

  onSelectFile(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      let selectedFile = <File> fileInput.target.files[i];
      this.formData.append('image', selectedFile);
    }
  }

  addProductImage() {
    this.formData.append('productId', this.productForUpdate.id.toPrecision());
    this.productImageService.add(this.formData).subscribe((response) => {

    });
  }

  getCurrentProduct() {
    return this.productService.getCurrentProduct();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  deleteImages(image: ProductImage) {
    if (window.confirm('Fotoğrafı silmek istediğinize emin misiniz?')) {
      this.productImageService.delete(image).subscribe((response) => {
        this.productForUpdate = {
          brandId: this.productForUpdate?.brandId,
          categoryId: this.productForUpdate?.categoryId,
          productName: this.productForUpdate?.productName,
          description: this.productForUpdate?.description,
          code: this.productForUpdate?.code,
          price: this.productForUpdate?.price,
          discountRate: this.productForUpdate?.discountRate,
          image: this.productForUpdate?.image.filter((c) => c.id !== image.id)
        };
      });
    }
  }

  ngDoCheck() {
    if (this.productForUpdate?.productName !== this.currentProduct?.name,
    this.productForUpdate?.brandId !== this.currentProduct?.brandId,
    this.productForUpdate?.categoryId !== this.currentProduct?.categoryId,
    this.productForUpdate?.code !== this.currentProduct?.code,
    this.productForUpdate?.price !== this.currentProduct?.price,
    this.productForUpdate?.description !== this.currentProduct?.description,
    this.productForUpdate?.discountRate !== this.currentProduct?.discountRate) {

      this.currentProduct.name = this.productForUpdate?.productName;
      this.currentProduct.brandId = this.productForUpdate?.brandId;
      this.currentProduct.categoryId = this.productForUpdate?.categoryId;
      this.currentProduct.code = this.productForUpdate?.code;
      this.currentProduct.price = this.productForUpdate?.price;
      this.currentProduct.description = this.productForUpdate?.description;
      this.currentProduct.discountRate = this.productForUpdate?.discountRate;

      this.productUpdateForm.patchValue({
        name: this.currentProduct?.name,
        brandId: this.currentProduct?.brandId,
        categoryId: this.currentProduct?.categoryId,
        code: this.currentProduct?.code,
        price: this.currentProduct?.price,
        discountRate: this.currentProduct?.discountRate,
        description: this.currentProduct?.description
      });
    }
  }

  setCommentInfos() {
    this.productUpdateForm.patchValue(
      this.selectedProduct
    );

  }
}
