import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  public categories: any[] = [];

  public totalSpend: string = '0';

  public totalEarn: string = '0';

  public totalBalance: string = '0';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  addCategory(id: number | null): void {
    let dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '350px',
      height: 'fit-content',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      disableClose: true,
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getAll();
      },
    });
  }

  getAll(): void {
    this.http.get<any[]>(this.apiUrl + '/categories').subscribe((res) => {
      this.categories = res;
      this.getTotalSpend();
      this.getTotalBalance();
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

  getTotalSpend(): void {
    this.http
      .get<number>(this.apiUrl + '/categories/total-spend')
      .subscribe((res) => {
        this.totalSpend = this.formatNumber(res);
        if (this.totalSpend === '') {
          this.totalSpend = '0';
        }
      });
  }

  getTotalEarn(): void {
    this.http
      .get<number>(this.apiUrl + '/categories/total-earn')
      .subscribe((res) => {
        this.totalEarn = this.formatNumber(res);
        if (this.totalEarn === '') {
          this.totalEarn = '0';
        }
      });
  }

  getTotalBalance(): void {
    this.http
      .get<number>(this.apiUrl + '/wallets/total-balance')
      .subscribe((res) => {
        this.totalBalance = this.formatNumber(res);
        if (this.totalBalance === '') {
          this.totalBalance = '0';
        }
      });
  }
}
