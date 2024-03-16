import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css'],
})
export class WalletsComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  public wallets: any[] = [];

  public totalBalance: string = '0';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  addWallet(id: number | null): void {
    let dialogRef = this.dialog.open(WalletDialogComponent, {
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
    this.http.get<any[]>(this.apiUrl + '/wallets').subscribe((res) => {
      this.wallets = res;
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

  messageBox(id: number): void {
    this.http.get<any>(this.apiUrl + '/wallet/' + id).subscribe((res) => {
      let dialogRef = this.dialog.open(MessageboxComponent, {
        width: '500px',
        height: '200px',
        enterAnimationDuration: 500,
        exitAnimationDuration: 500,
        disableClose: true,
        data: {
          id: id,
          name: 'ví ' + res.name,
          message: 'Bạn có chắc chắn muốn xoá ví ' + res.name + ' không?',
          subMessage: '(Sau khi xoá, số dư thanh toán sẽ được cập nhật lại)',
          url: '/wallet/',
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
