import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LIstofClaimPage } from './listof-claim.page';

describe('LIstofClaimPage', () => {
  let component: LIstofClaimPage;
  let fixture: ComponentFixture<LIstofClaimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LIstofClaimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
