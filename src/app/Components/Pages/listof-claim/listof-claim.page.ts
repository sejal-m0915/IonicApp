import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GetClaimList } from 'src/app/Models/app.model';
import { AuthService } from '../../../Services/auth.service';
import { ClaimSearch, ErrorObj } from 'src/app/Models/app.res.model';
import { AuthDirective } from '../../../Directives/auth.directive';
import { ToastService } from 'src/app/Services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listof-claim',
  templateUrl: './listof-claim.page.html',
  styleUrls: ['./listof-claim.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LIstofClaimPage implements OnInit {

  public title: string = 'Claim List';
  public ClaimsData: any[] = [];
  private isFirstLoad = true;

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
    this.loadClaimsData();
  }

  public ionViewWillEnter(): void {
    if (!this.isFirstLoad) {
      this.loadClaimsData();
    }
  }

  private loadClaimsData(): void {
    let newClaims: GetClaimList = new GetClaimList();
    this.getClaims(newClaims);
  }

  public getClaims(newClaims: GetClaimList): void {

    newClaims.Client_Cd = sessionStorage.getItem('Entity_Cd')!;

    this.authService.GetClaimList(newClaims).subscribe({
      next: (res: Array<ClaimSearch>) => {
        // console.log("Claim Data =>" + JSON.stringify(res))
        this.ClaimsData = res;
      },
      error: (e: ErrorObj) => {
        console.error('Error', e);
        this.toastService.presentToast('No Data Found.');
      },
    })
  }

  public pre_pg(): void {
    this.router.navigate(['/client/track-policy']);
  }

}
