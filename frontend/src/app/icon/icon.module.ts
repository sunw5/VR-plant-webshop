import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Home, Edit, Edit2, Edit3, Archive, ShoppingCart, Trash, User, Paperclip, BookOpen } from 'angular-feather/icons';

const icons = {
  Home,
  ShoppingCart,
  Edit2,
  Edit3,
  Edit,
  Archive,
  Trash,
  User,
  Paperclip,
  BookOpen
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons),
  ],
  exports: [
    FeatherModule,
  ],
})
export class IconModule { }
