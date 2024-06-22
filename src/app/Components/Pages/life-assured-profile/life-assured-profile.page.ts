import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthDirective } from '../../../Directives/auth.directive';

@Component({
  selector: 'app-life-assured-profile',
  templateUrl: './life-assured-profile.page.html',
  styleUrls: ['./life-assured-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LifeAssuredProfilePage implements OnInit {
  public title: string = 'Assured Profile';
  constructor() {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
  }

}
