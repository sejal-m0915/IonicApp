import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PopupPage implements OnInit {
  @Input() header!: string;
  @Input() content!: string;
  @Input() icon!: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  closePopup() {
    this.modalController.dismiss();
  }

}
