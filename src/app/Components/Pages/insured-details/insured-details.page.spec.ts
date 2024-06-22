import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuredDetailsPage } from './insured-details.page';

describe('InsuredDetailsPage', () => {
  let component: InsuredDetailsPage;
  let fixture: ComponentFixture<InsuredDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InsuredDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
