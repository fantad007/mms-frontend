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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TransactionDialogComponent>
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      wallet: [null],
      category: [null],
      amount: [null],
      description: [''],
    });
  }

  saveAndUpdate(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
