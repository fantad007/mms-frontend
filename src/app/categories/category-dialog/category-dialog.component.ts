import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css'],
})
export class CategoryDialogComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  categoryForm: FormGroup = new FormGroup({});

  private type: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoryDialogComponent>
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  onRadioChange(event: MatRadioChange) {
    const selectedValue = event.value;
    this.type = selectedValue;
  }

  saveAndUpdate(): void {
    const categoryParam = {
      type: this.type,
      name: this.categoryForm.controls['name'].value,
      description: this.categoryForm.controls['description'].value,
    };
    if (!this.data.id) {
      this.http.post<any>(this.apiUrl + '/category', categoryParam).subscribe({
        next: () => {
          this.matSnackBar.open('Tạo danh mục thành công', '', {
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
