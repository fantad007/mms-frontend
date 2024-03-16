import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  public categories: any[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.http.get<any[]>(this.apiUrl + '/categories').subscribe((res) => {
      this.categories = res;
    });
  }

  formatNumber(numberToFormat: number | null): string {
    const formatted = this.decimalPipe.transform(numberToFormat, '1.0-0');
    return typeof formatted === 'string' ? formatted : '';
  }

  messageBox(id: number): void {
    this.http.get<any>(this.apiUrl + '/category/' + id).subscribe((res) => {
      let dialogRef = this.dialog.open(MessageboxComponent, {
        width: '500px',
        height: '200px',
        enterAnimationDuration: 500,
        exitAnimationDuration: 500,
        disableClose: true,
        data: {
          id: id,
          name: 'ví ' + res.name,
          message: 'Bạn có chắc chắn muốn xoá danh mục ' + res.name + ' không?',
          subMessage:
            '(Sau khi xoá, hệ thống sẽ cập nhật lại các danh mục của bạn)',
          url: '/category/',
        },
      });
      dialogRef.afterClosed().subscribe({
        next: () => {
          this.getAll();
        },
      });
    });
  }
}
