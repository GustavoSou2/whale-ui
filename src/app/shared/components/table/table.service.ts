import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableDataSourceService<T> {
  private dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private stateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  data$: Observable<T[]> = this.dataSubject.asObservable();
  state$: Observable<boolean> = this.stateSubject.asObservable();

  get listener() {
    return this.stateSubject;
  }

  setData(data: T[]): void {
    this.dataSubject.next(data);
  }

  addData(data: T[]): void {
    const currentData = this.dataSubject.value;
    this.dataSubject.next([...currentData, ...data]);
  }

  reloadData(newData: T[]): void {
    this.setData(newData);
  }

  reload() {
    this.stateSubject.next(!this.stateSubject.value);
  }
}
