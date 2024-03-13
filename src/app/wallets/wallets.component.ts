import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';
import { MessageboxComponent } from '../messagebox/messagebox.component';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css'],
})
export class WalletsComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  wallets: any[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

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
    dialogRef.afterClosed().subscribe(() => {});
    dialogRef.componentInstance.onClose = () => {
      this.getAll();
    };
  }

  getAll(): void {
    this.http.get<any[]>(this.apiUrl + '/wallets').subscribe((res) => {
      this.wallets = res;
    });
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
          message: 'Bạn có chắc chắn muốn xoá ví ' + res.name + ' không?',
        },
      });
      dialogRef.afterClosed().subscribe(() => {});
      dialogRef.componentInstance.onClose = () => {
        this.getAll();
      };
    });
  }
}
