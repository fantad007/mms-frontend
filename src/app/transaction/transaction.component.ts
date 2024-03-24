import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  public transactions: any[] = [];

  public totalBalance: string = '0';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  addTransaction(id: number | null): void {
    let dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
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
    this.http.get<any[]>(this.apiUrl + '/transactions').subscribe((res) => {
      this.transactions = res;
      this.getTotalBalance();
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

  formatNumber(numberToFormat: number | null): string {
    const formatted = this.decimalPipe.transform(numberToFormat, '1.0-0');
    return typeof formatted === 'string' ? formatted : '';
  }
}
