import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DataTablesModule} from 'angular-datatables'

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DataTablesModule]
})
export class TestPagePage implements OnInit {

  dtoptions: DataTables.Settings={};

  constructor() { }

  ngOnInit():void {

    this.dtoptions={
      pagingType: 'full_numbers',
    };

  }

}
