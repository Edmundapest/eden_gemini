import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeThreeJsComponent } from './home-three-js.component';

describe('HomeThreeJsComponent', () => {
  let component: HomeThreeJsComponent;
  let fixture: ComponentFixture<HomeThreeJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeThreeJsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeThreeJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
