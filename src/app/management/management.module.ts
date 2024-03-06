import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletsComponent } from '../wallets/wallets.component';
import { CategoriesComponent } from '../categories/categories.component';



@NgModule({
  declarations: [
    WalletsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ManagementModule { }
