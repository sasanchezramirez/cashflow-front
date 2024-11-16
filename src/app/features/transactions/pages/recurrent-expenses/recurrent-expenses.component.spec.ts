import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentExpensesComponent } from './recurrent-expenses.component';

describe('RecurrentExpensesComponent', () => {
  let component: RecurrentExpensesComponent;
  let fixture: ComponentFixture<RecurrentExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurrentExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurrentExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
