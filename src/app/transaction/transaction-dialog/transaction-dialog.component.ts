import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css'],
})
export class TransactionDialogComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  transactionForm: FormGroup = new FormGroup({});

  public wallets: any[] = [];

  public categories: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TransactionDialogComponent>
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      wallets: [null],
      categories: [null],
      amount: [null],
      transactionTime: [null],
      description: [''],
    });
    this.getAllWallets();
    this.getAllCategories();
    this.setDefaultDate();
  }

  getAllWallets(): void {
    this.http.get<any[]>(this.apiUrl + '/wallets').subscribe((res) => {
      this.wallets = res;
      this.transactionForm.controls['wallets'].setValue(
        res.map((wallet) => wallet.id)
      );
    });
  }

  getAllCategories(): void {
    this.http.get<any[]>(this.apiUrl + '/categories').subscribe((res) => {
      this.categories = res;
      this.transactionForm.controls['categories'].setValue(
        res.map((category) => category.id)
      );
    });
  }

  setDefaultDate(): void {
    this.transactionForm.controls['transactionTime'].setValue(new Date());
  }

  saveAndUpdate(): void {
    const transactionParam = {
      walletId: this.transactionForm.controls['wallets'].value,
      categoryId: this.transactionForm.controls['categories'].value,
      amount: this.transactionForm.controls['amount'].value,
      atTime: this.transactionForm.controls['transactionTime'].value,
      description: this.transactionForm.controls['description'].value,
    };
    if (!this.data.id) {
      this.http
        .post<any>(this.apiUrl + '/transaction', transactionParam)
        .subscribe({
          next: () => {
            this.matSnackBar.open('Tạo giao dịch thành công', '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.dialogRef.close();
          },
        });
    } else {
      console.log('Update');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
