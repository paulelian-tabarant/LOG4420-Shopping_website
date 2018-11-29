import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatPrice'
})
export class PricePipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2).replace(".", ",") + " $";
  }
}