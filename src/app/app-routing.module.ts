import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent } from './wallets/wallets.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: 'wallets', component: WalletsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'transactions', component: TransactionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
