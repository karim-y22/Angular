import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleManagerComponent } from './admin-schedule-manager.component';

describe('AdminScheduleManagerComponent', () => {
  let component: AdminScheduleManagerComponent;
  let fixture: ComponentFixture<AdminScheduleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminScheduleManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminScheduleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
