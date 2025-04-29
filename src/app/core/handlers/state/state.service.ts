import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state = new Map<string, BehaviorSubject<any>>();

  createState(key: string, initialValue: any = null) {
    if (!this.state.has(key)) {
      this.state.set(key, new BehaviorSubject(initialValue));
    }
  }

  getState(key: string) {
    return this.state.get(key)?.asObservable();
  }

  setState(key: string, value: any) {
    this.state.get(key)?.next(value);
  }

  deleteState(key: string) {
    this.state.get(key)?.complete();
    this.state.delete(key);
  }
}
