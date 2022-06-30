import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

export interface INgxTableColumn {
  title: string;
  key: string;
}

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss'],
})
export class NgxDataTableComponent<T extends { [x: string]: any }>
  implements OnInit
{
  @Input() name: string = '';
  @Input() list: T[] = [];
  @Input() columns: INgxTableColumn[] = [];
  @Output() selectOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() deleteOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() createOne = new EventEmitter();

  // filter pipe params
  keys: {[x:string]:string} = {};
  phrase: string = '';
  filterKey: string = '';

  filteredList!: T[];
  flattenedList: T[] = [];

  pageSize: number = 10;
  startSlice: number = 0;
  endSlice: number = 10;
  page: number = 1;
  pageList: number[] = [];

  constructor() {}

  filterData(): void {
    console.log('filterData', this.phrase, this.filterKey);
    const pipe = new FilterPipe<T>();
    this.filteredList = pipe.transform(this.list, this.phrase, this.filterKey);
    this.pageList = Array.from(Array(Math.ceil(this.filteredList.length / this.pageSize)).keys()).map(i => i + 1);

  }

  ngOnInit(): void {
    this.filteredList = this.list;
    this.pageList = Array.from(Array(Math.ceil(this.filteredList.length / this.pageSize)).keys()).map(i => i + 1);

    for(const column of this.columns) {
      this.keys[column.title] = column.key;
    }
    // todo avoid mutating the original list
    this.flattenedList = this.list.map((item) => {
      for (const key in item) {
        // convert boolean to "igen" or "nem"
        if (typeof item[key] === 'boolean') {
          item[key] = item[key] ? ('igen' as any) : 'nem';
        }
        // if item.key is object, flatten it
        if (item[key] && typeof item[key] === 'object') {
          let merged: any = '';
          for (const subKey in item[key]) {
            merged += `${item[key][subKey]} `;
          }
          merged.trimEnd();
          item[key] = merged;
        }
      }
      return item;
    });
  }

  onSelect(entity: T): void {
    this.selectOne.emit(entity);
  }

  onDelete(entity: T): void {
    this.deleteOne.emit(entity);
  }

  onCreate(): void {
    this.createOne.emit();
  }

  jumpToPage(pageNum: number): void {
    this.page = pageNum;
    this.startSlice = this.pageSize * (pageNum - 1);
    this.endSlice = this.startSlice + this.pageSize;
  }
}
