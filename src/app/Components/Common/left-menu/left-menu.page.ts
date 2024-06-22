import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { navbarData } from './nav-data';
import { RouterModule, Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.page.html',
  styleUrls: ['./left-menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LeftMenuPage implements OnInit {
  public user_first_Name!: string;
  constructor(private router: Router) { }
  public collapsed = false;
  public screenWidth = 0;
  public navData = navbarData;
  // isButtonVisible = true;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.user_first_Name = sessionStorage.getItem('Entity_Nm')!;
  }

  public onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  public toggleCollapse(): void {
    // this.isButtonVisible = false;
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  public closeSidenav(): void {
    this.collapsed = false
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  public logout(): void {
    this.router.navigate(['/login']);
  }
}
