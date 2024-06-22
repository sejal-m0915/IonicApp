import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { GetProposalList, ClientList } from '../../../Models/app.model';
import { ProposalListing, ErrorObj, ClientListObj } from 'src/app/Models/app.res.model';
import { AppEnum } from '../../../Constants/app.enum';
import { AuthService } from '../../../Services/auth.service';
import { ShareDataService } from 'src/app/Services/share-data.service';
import { AuthDirective } from '../../../Directives/auth.directive';


@Component({
  selector: 'app-track-policy',
  templateUrl: './track-policy.page.html',
  styleUrls: ['./track-policy.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TrackPolicyPage implements OnInit {
  private title: string = "Track Policy";
  public proposalData!: any;
  public clientData!: any;
  private insuredDetCalled = false;
  constructor(private router: Router, private shareData: ShareDataService, private authService: AuthService) {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {

    // client api
    let newPolicy: GetProposalList = new GetProposalList();
    this.showActivePolicy(newPolicy);

  }

  // client api
  public showActivePolicy(newPolicy: GetProposalList): void {
    // debugger;

    let entityCode = sessionStorage.getItem("Entity_Cd")!;
    // console.log("entity code" + entityCode);
    let newClient: ClientList = new ClientList();
    newClient.Client_Cd = entityCode;

    this.authService.ClientList(newClient).subscribe({
      next: (res: ClientListObj) => {
        this.clientData = res;
        // console.log("Client_dt =>", res);
        newPolicy.Client_Cd = newClient.Client_Cd;
        this.fetchProposalList(newPolicy);
      },
      error: (e: ErrorObj) => {
        console.log(e, "No Active Polices");
      }
    });

  }


  // client api
  public fetchProposalList(newPolicy: GetProposalList): void {
    newPolicy.Mode = AppEnum.Mode_R;

    this.authService.GetProposalList(newPolicy).subscribe({
      next: (res: Array<ProposalListing>) => {
        this.proposalData = res;
        // console.log('Policy Data =>', res);
      },
      error: (e: ErrorObj) => {
        console.error('Error', e);
      }
    });
  }

  public insured_det(policyId: string, policyVersionId: string): void {
    this.router.navigate(['/client/insured-details'], {
      queryParams: {
        "POL_ID": policyId,
        "POL_VER_ID": policyVersionId
      }
    });
  }

  sendData(value: string): void {
    const dataToSend = value;
    this.router.navigate(['/client/policy-details'], { queryParams: { "POL_ID": dataToSend } });
  }

}
