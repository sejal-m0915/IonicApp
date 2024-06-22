import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftMenuPage } from './left-menu.page';

describe('LeftMenuPage', () => {
  let component: LeftMenuPage;
  let fixture: ComponentFixture<LeftMenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeftMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
