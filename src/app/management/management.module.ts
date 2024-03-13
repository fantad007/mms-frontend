import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { TableModule } from 'primeng/table';

import { WalletsComponent } from '../wallets/wallets.component';
import { WalletDialogComponent } from '../wallets/wallet-dialog/wallet-dialog.component';
import { CategoriesComponent } from '../categories/categories.component';
import { MessageboxComponent } from '../messagebox/messagebox.component';

@NgModule({
  declarations: [
    WalletsComponent,
    CategoriesComponent,
    WalletDialogComponent,
    MessageboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // material
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,

    // primeng
    TableModule,
  ],
})
export class ManagementModule {}
