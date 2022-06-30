import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { IconModule } from '../icon/icon.module';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgxDataTableComponent, FilterPipe],
  imports: [CommonModule, IconModule, FormsModule],
  exports: [NgxDataTableComponent],
})
export class DataTableModule {}
