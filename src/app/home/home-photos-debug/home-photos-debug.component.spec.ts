import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePhotosDebugComponent } from './home-photos-debug.component';

describe('HomePhotosDebugComponent', () => {
  let component: HomePhotosDebugComponent;
  let fixture: ComponentFixture<HomePhotosDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePhotosDebugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePhotosDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
