import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaProductComponent } from './mana-product.component';

describe('ManaProductComponent', () => {
  let component: ManaProductComponent;
  let fixture: ComponentFixture<ManaProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManaProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManaProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
