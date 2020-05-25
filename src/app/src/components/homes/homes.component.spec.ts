import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { spyOnClass } from "jasmine-es6-spies";

import { HomesComponent } from "./homes.component";
import { DataService } from "../../services/data.service";
import { of } from "rxjs";
import { DialogService } from "../../services/dialog.service";

describe("HomesComponent", () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  // store ref of the mock service
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomesComponent],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: DialogService, useFactory: () => spyOnClass(DialogService) },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(DialogService);
    
    const homes = require("../../../../assets/homes.json");
    dataService.getHomes$.and.returnValues(of(homes));

    fixture.detectChanges();
  });

  it("should show homes", () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="home"]').length
    ).toBe(3);
  });

  it("should show home info", () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="title"]').innerText).toEqual(
      "Home 1"
    );
    expect(home.querySelector('[data-test="location"]').innerText).toEqual(
      "west palm beach"
    );
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });

  it("should show book button", () => {
    // Arrange
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    // Act Assert
    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  });

  it("should use dialog service to open modal when clicking book button", () => {
    // ARRANGE: grab the button to click
    const bookBtn = fixture.nativeElement.querySelector(
      '[data-test="home"] button'
    );

    // ACT: click the button
    bookBtn.click();

    // ASSERT: the dialog service was used to open modal
    expect(dialogService.open).toHaveBeenCalled();
  });
});
