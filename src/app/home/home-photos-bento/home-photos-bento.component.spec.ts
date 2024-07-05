import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePhotosBentoComponent } from './home-photos-bento.component';

describe('HomePhotosBentoComponent', () => {
  let component: HomePhotosBentoComponent;
  let fixture: ComponentFixture<HomePhotosBentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePhotosBentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePhotosBentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
