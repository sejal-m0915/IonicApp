import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-body',
  templateUrl: './body.page.html',
  styleUrls: ['./body.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BodyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() collapsed = false;
  @Input() screenWidth = 0

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed' 
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
