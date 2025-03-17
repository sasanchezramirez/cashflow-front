import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  get state(): T {
    return this.state$.getValue();
  }

  get state$(): Observable<T> {
    return this.state$.asObservable();
  }

  setState(newState: Partial<T>): void {
    this.state$.next({
      ...this.state,
      ...newState
    });
  }

  reset(initialState: T): void {
    this.state$.next(initialState);
  }
}
