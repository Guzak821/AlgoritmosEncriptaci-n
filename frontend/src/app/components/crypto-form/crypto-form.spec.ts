import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoForm } from './crypto-form';

describe('CryptoForm', () => {
  let component: CryptoForm;
  let fixture: ComponentFixture<CryptoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
