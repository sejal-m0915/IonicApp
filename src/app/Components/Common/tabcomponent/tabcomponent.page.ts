import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabcomponent',
  templateUrl: './tabcomponent.page.html',
  styleUrls: ['./tabcomponent.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TabcomponentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  currentCity: string = 'one';

  tabs = [
    { id: 'one', label: 'Profile' },
    { id: 'two', label: 'Contact' },
    { id: 'three', label: 'Bank Details' },
  ];

  openTab(cityName: string): void {
    this.currentCity = cityName;
  }


}
