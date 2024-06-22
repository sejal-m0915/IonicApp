import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LeftMenuPage } from '../../Common/left-menu/left-menu.page';
import { BodyPage } from '../../Common/body/body.page';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-inner-layout',
  templateUrl: './inner-layout.page.html',
  styleUrls: ['./inner-layout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeftMenuPage, BodyPage],

})
export class InnerLayoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  public onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
