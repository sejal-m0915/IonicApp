import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthDirective } from '../../../Directives/auth.directive';

@Component({
  selector: 'app-track-the-claim',
  templateUrl: './track-the-claim.page.html',
  styleUrls: ['./track-the-claim.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TrackTheClaimPage implements OnInit {
  public title: string = 'Claim Track';
  constructor() {
    AuthDirective.SetTitle(this.title);
  }

  ngOnInit() {
  }

}
