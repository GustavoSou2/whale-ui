import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataSource } from './table.component';

describe('TableDataSource', () => {
  let component: TableDataSource;
  let fixture: ComponentFixture<TableDataSource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDataSource],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDataSource);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
