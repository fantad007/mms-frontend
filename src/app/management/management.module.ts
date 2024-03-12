import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TableModule } from 'primeng/table';

import { WalletsComponent } from '../wallets/wallets.component';
import { WalletDialogComponent } from '../wallets/wallet-dialog/wallet-dialog.component';
import { CategoriesComponent } from '../categories/categories.component';

@NgModule({
  declarations: [WalletsComponent, CategoriesComponent, WalletDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // material
    MatDialogModule,
    MatSnackBarModule,

    // primeng
    TableModule,
  ],
})
export class ManagementModule {}
