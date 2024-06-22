import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NomieePage } from './nomiee.page';

describe('NomieePage', () => {
  let component: NomieePage;
  let fixture: ComponentFixture<NomieePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NomieePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
