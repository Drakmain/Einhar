import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeurAdminComponent } from './serveur-admin.component';

describe('ServeurAdminComponent', () => {
  let component: ServeurAdminComponent;
  let fixture: ComponentFixture<ServeurAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServeurAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeurAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
