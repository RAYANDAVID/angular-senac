import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourComponentNameComponent } from './your-component-name.component';

describe('YourComponentNameComponent', () => {
  let component: YourComponentNameComponent;
  let fixture: ComponentFixture<YourComponentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourComponentNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourComponentNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
