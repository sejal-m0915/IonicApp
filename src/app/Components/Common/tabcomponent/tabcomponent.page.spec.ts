import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabcomponentPage } from './tabcomponent.page';

describe('TabcomponentPage', () => {
  let component: TabcomponentPage;
  let fixture: ComponentFixture<TabcomponentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabcomponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
