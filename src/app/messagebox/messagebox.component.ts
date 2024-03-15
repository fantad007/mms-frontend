import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css'],
})
export class MessageboxComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MessageboxComponent>
  ) {}

  ngOnInit(): void {}

  delete(): void {
    this.http
      .delete<void>(this.apiUrl + this.data.url + this.data.id)
      .subscribe({
        next: () => {
          this.matSnackBar.open('Xoá ' + this.data.name + ' thành công', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        },
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
