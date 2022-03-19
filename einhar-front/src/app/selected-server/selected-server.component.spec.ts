import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedServerComponent } from './selected-server.component';

describe('SelectedServerComponent', () => {
  let component: SelectedServerComponent;
  let fixture: ComponentFixture<SelectedServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
