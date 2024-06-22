import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthDirective } from '../../../Directives/auth.directive';

@Component({
  selector: 'app-deferment',
  templateUrl: './deferment.page.html',
  styleUrls: ['./deferment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DefermentPage implements OnInit {
  public title: string = 'Deferment';
  constructor() {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
  }

}
