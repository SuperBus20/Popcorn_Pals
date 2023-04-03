import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUserProfileComponent } from './follow-user-profile.component';

describe('FollowUserProfileComponent', () => {
  let component: FollowUserProfileComponent;
  let fixture: ComponentFixture<FollowUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
