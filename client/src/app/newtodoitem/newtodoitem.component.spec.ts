import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtodoitemComponent } from './newtodoitem.component';

describe('NewtodoitemComponent', () => {
  let component: NewtodoitemComponent;
  let fixture: ComponentFixture<NewtodoitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtodoitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtodoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
