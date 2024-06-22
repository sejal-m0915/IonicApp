import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapsecardcomponentPage } from './collapsecardcomponent.page';

describe('CollapsecardcomponentPage', () => {
  let component: CollapsecardcomponentPage;
  let fixture: ComponentFixture<CollapsecardcomponentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CollapsecardcomponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
