import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BookComponent } from "./book.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';


describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;
  const el = (selector) => fixture.nativeElement.querySelector(selector);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [BookComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;

    const homes = require("../../../../assets/homes.json");
    dialogData.home = homes[0];
    fixture.detectChanges();
  });

  it("should show a title", () => {
    expect(
      el('[data-test="title"]').textContent
    ).toContain("Book Home 1");
  });

  it('should show a price', () => {
    expect(
      el('[data-test="price"]').textContent
    ).toContain("$105 per night");
  });

  it('should show check in date field', () => {
    expect(
      el('[data-test="check-in"]')
    ).toBeTruthy();
  });

  it('should show check out date field', () => {
    expect(
      el('[data-test="check-out"]')
    ).toBeTruthy();
  });

  it('should show total', () => {
    // example https://stackoverflow.com/questions/41063005/angular-unit-test-input-value
    // expect(el()).toBeTruthy();

    // user enter check in date 5/25/20
    const checkIn =  el('[data-test="check-in"] input')
    checkIn.value = '05/25/2020';
    checkIn.dispatchEvent(new Event('input'));
    // user enter check out date 5/30/20
    const checkOut =  el('[data-test="check-out"] input')
    checkOut.value = '05/30/2020';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    // ASSERT that total shows 5x125 = $525
    expect(el('[data-test="total"]').textContent).toContain('Total: $525');
  });

  // should book home after clicking the book button
  // it('should create', () => {
  //   expect(el('[data-test="total"]')).toBeTruthy();
  // });

});
