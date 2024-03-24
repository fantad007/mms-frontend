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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { TableModule } from 'primeng/table';

import { WalletsComponent } from '../wallets/wallets.component';
import { WalletDialogComponent } from '../wallets/wallet-dialog/wallet-dialog.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryDialogComponent } from '../categories/category-dialog/category-dialog.component';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionDialogComponent } from '../transaction/transaction-dialog/transaction-dialog.component';

@NgModule({
  declarations: [
    WalletsComponent,
    WalletDialogComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    MessageboxComponent,
    TransactionComponent,
    TransactionDialogComponent,
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
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,

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
