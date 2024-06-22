import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackPolicyPage } from './track-policy.page';

describe('TrackPolicyPage', () => {
  let component: TrackPolicyPage;
  let fixture: ComponentFixture<TrackPolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrackPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
