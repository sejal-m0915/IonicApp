import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponentPage } from './card-component.page';

describe('CardComponentPage', () => {
  let component: CardComponentPage;
  let fixture: ComponentFixture<CardComponentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
