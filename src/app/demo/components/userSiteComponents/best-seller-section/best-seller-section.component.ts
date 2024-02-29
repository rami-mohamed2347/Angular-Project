import { Component } from '@angular/core';
import { ProductsSliderComponent } from '../products-slider/products-slider.component';

@Component({
  selector: 'app-best-seller-section',
  standalone: true,
  imports: [ProductsSliderComponent],
  templateUrl: './best-seller-section.component.html',
  styleUrl: './best-seller-section.component.css'
})
export class BestSellerSectionComponent {

}
