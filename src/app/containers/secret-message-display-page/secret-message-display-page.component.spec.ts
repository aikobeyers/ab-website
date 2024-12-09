import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretMessageDisplayPageComponent } from './secret-message-display-page.component';

describe('SecretMessageDisplayPageComponent', () => {
  let component: SecretMessageDisplayPageComponent;
  let fixture: ComponentFixture<SecretMessageDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretMessageDisplayPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretMessageDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
