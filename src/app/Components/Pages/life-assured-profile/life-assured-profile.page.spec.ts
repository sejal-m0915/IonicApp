import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeAssuredProfilePage } from './life-assured-profile.page';

describe('LifeAssuredProfilePage', () => {
  let component: LifeAssuredProfilePage;
  let fixture: ComponentFixture<LifeAssuredProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LifeAssuredProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
