import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthDirective } from '../../../Directives/auth.directive';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.page.html',
  styleUrls: ['./paymentgateway.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentgatewayPage implements OnInit {

  public title: string = 'Payment Gateway';
  constructor() {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
  }
  currentActive: string = 'one';

  tabs = [
    { id: 'one', label: 'Credit Card' },
    { id: 'two', label: 'Debit Card' },
    { id: 'three', label: 'Online Banking' },

  ];

  openTab(Active: string): void {
    this.currentActive = Active;
  }


}
