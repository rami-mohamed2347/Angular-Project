import { Component, OnInit } from '@angular/core';
import { ProductsSliderComponent } from '../products-slider/products-slider.component';

@Component({
  selector: 'app-flash-sale-section',
  standalone: true,
  imports: [ ProductsSliderComponent],
  templateUrl: './flash-sale-section.component.html',
  styleUrl: './flash-sale-section.component.css'
})
export class FlashSaleSectionComponent implements OnInit {

  countDownDate!: number;
  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;
  interval: any;

  ngOnInit() {
    this.countDownDate = new Date("May 20, 2024 15:37:25").getTime();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.countDownDate - now;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update your template variables accordingly
      // For example, if you have elements with IDs "days", "hours", "minutes", "seconds"
      // in your template, you can bind these variables in the template using Angular's data binding.
      // Example: <div>{{ days }}D</div>
      // Update your template accordingly.

      if (distance < 0) {
        clearInterval(this.interval);
        // Handle expiration, for example:
        // this.expiredMessage = "EXPIRED";
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
