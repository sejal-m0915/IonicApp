import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyDetailsPage } from './policy-details.page';

describe('PolicyDetailsPage', () => {
  let component: PolicyDetailsPage;
  let fixture: ComponentFixture<PolicyDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PolicyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
