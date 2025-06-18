import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppointmentBookingComponent } from './user-appointment-booking.component';

describe('UserAppointmentBookingComponent', () => {
  let component: UserAppointmentBookingComponent;
  let fixture: ComponentFixture<UserAppointmentBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAppointmentBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAppointmentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
