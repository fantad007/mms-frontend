import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.css'],
})
export class WalletDialogComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  onClose: Function = () => {};

  walletForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<WalletDialogComponent>
  ) {}

  ngOnInit(): void {
    this.walletForm = this.formBuilder.group({
      name: [''],
      balance: [null],
    });
  }

  saveAndUpdate(): void {
    const walletParam = {
      name: this.walletForm.controls['name'].value,
      balance: this.walletForm.controls['balance'].value,
    };
    console.log(walletParam);
    if (!this.data.id) {
      this.http.post<any>(this.apiUrl + '/wallet', walletParam).subscribe({
        next: () => {
          this.matSnackBar.open('Tạo ví thành công', '', {
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
