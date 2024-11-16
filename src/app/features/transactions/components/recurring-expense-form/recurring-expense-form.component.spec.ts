import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringExpenseFormComponent } from './recurring-expense-form.component';

describe('RecurringExpenseFormComponent', () => {
  let component: RecurringExpenseFormComponent;
  let fixture: ComponentFixture<RecurringExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringExpenseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
