import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from '@angular/material/radio';

import { TableModule } from 'primeng/table';

import { WalletsComponent } from '../wallets/wallets.component';
import { WalletDialogComponent } from '../wallets/wallet-dialog/wallet-dialog.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryDialogComponent } from '../categories/category-dialog/category-dialog.component';
import { MessageboxComponent } from '../messagebox/messagebox.component';

@NgModule({
  declarations: [
    WalletsComponent,
    WalletDialogComponent,
    CategoriesComponent,
    CategoryDialogComponent,
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
    MatRadioModule,

    // primeng
    TableModule,
  ],
  providers: [
    DecimalPipe, // Add DecimalPipe to providers array
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class ManagementModule {}
