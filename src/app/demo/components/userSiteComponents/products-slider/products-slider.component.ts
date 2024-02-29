import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'; 
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-products-slider',
  standalone: true,
  imports: [
    FontAwesomeModule,
  ],
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.css'
})
export class ProductsSliderComponent  {
  faChevronLeft =faChevronLeft;
  faChevronRight =faChevronRight
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faHeart  = faHeart;
  faCartShopping = faCartShopping

  @ViewChild('cards') cardsContainer!: ElementRef;
  
  handleScrollNext(): void {
    const cards = this.cardsContainer.nativeElement as HTMLElement;
    cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
  }
  handleScrollPrev(): void {
    const cards = this.cardsContainer.nativeElement as HTMLElement;
    cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
  }
}
