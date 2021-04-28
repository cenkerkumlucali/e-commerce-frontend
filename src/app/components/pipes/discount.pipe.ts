import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number, discount:number): number {
  var  deger =  value - value/discount 
  var discountt = deger.toFixed(2)
  var result= parseFloat(discountt)
  return result
  }

}
