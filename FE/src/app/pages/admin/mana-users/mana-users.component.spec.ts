import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaUsersComponent } from './mana-users.component';

describe('ManaUsersComponent', () => {
  let component: ManaUsersComponent;
  let fixture: ComponentFixture<ManaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
