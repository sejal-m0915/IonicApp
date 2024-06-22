import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-collapsecardcomponent',
  templateUrl: './collapsecardcomponent.page.html',
  styleUrls: ['./collapsecardcomponent.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CollapsecardcomponentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
