import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackPolicyProfilePage } from './track-policy-profile.page';

describe('TrackPolicyProfilePage', () => {
  let component: TrackPolicyProfilePage;
  let fixture: ComponentFixture<TrackPolicyProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrackPolicyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
