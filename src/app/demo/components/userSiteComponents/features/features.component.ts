import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons'; 
import { faHeadset } from '@fortawesome/free-solid-svg-icons'; 
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'; 
import { faWallet } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  faTruck = faTruck;
  faHeadset = faHeadset;
  faMoneyBill =faMoneyBill;
  faWallet = faWallet
}
