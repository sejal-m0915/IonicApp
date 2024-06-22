import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackTheClaimPage } from './track-the-claim.page';

describe('TrackTheClaimPage', () => {
  let component: TrackTheClaimPage;
  let fixture: ComponentFixture<TrackTheClaimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrackTheClaimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
