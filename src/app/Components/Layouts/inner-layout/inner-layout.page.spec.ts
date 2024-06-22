import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InnerLayoutPage } from './inner-layout.page';

describe('InnerLayoutPage', () => {
  let component: InnerLayoutPage;
  let fixture: ComponentFixture<InnerLayoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InnerLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
