import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefermentPage } from './deferment.page';

describe('DefermentPage', () => {
  let component: DefermentPage;
  let fixture: ComponentFixture<DefermentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DefermentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
