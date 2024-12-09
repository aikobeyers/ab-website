import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretMessageConfigPageComponent } from './secret-message-config-page.component';

describe('SecretMessageConfigPageComponent', () => {
  let component: SecretMessageConfigPageComponent;
  let fixture: ComponentFixture<SecretMessageConfigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretMessageConfigPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretMessageConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
