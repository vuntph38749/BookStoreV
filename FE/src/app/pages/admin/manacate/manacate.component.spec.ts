import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManacateComponent } from './manacate.component';

describe('ManacateComponent', () => {
  let component: ManacateComponent;
  let fixture: ComponentFixture<ManacateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManacateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManacateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
