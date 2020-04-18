import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies';

import { HomesComponent } from './homes.component';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  // store ref of the mock service
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomesComponent],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    dataService.getHomes$.and.returnValues(
      of([
        {
          title: 'Home 1',
          image: 'assets/listing.jpg',
          location: 'west palm beach',
        },
        {
          title: 'Home 2',
          image: 'assets/listing.jpg',
          location: 'waterbury',
        },
        {
          title: 'Home 3',
          image: 'assets/listing.jpg',
          location: 'orlando',
        },
      ])
    );

    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="home"]').length
    ).toBe(3);
  });

  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="title"]').innerText).toEqual(
      'Home 1'
    );
    expect(home.querySelector('[data-test="location"]').innerText).toEqual(
      'west palm beach'
    );
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });

  it('should show book button', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  });
});
