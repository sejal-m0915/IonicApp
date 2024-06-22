import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataTablesModule } from 'angular-datatables';
import { AuthService } from '../../../Services/auth.service';
import { ShareDataService } from 'src/app/Services/share-data.service';
import { ErrorObj, PolicyInsuredObj, ClientListObj, ProposalListing, } from 'src/app/Models/app.res.model';
import { GetPolicyInsured, ClientList, GetProposalList, } from 'src/app/Models/app.model';
import { AppEnum } from 'src/app/Constants/app.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthDirective } from '../../../Directives/auth.directive';



@Component({
  selector: 'app-insured-details',
  templateUrl: './insured-details.page.html',
  styleUrls: ['./insured-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DataTablesModule],
})
export class InsuredDetailsPage implements OnInit {
  public title: string = 'Insured Details';
  public policyInsured!: GetPolicyInsured;
  public clientData!: any;
  public proposalData!: any;
  public customerPolicyInsured!: Number[];
  public policyInsuredData: any[] = [];
  public loading: boolean = true;

  // dtoptions: DataTablesOptions  = {};
  dtoptions: DataTables.Settings = {};

  constructor(private authService: AuthService, private shareData: ShareDataService, private router: Router, private _ActivatedRoute: ActivatedRoute) {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
    this.dtoptions = {
      pagingType: 'full_numbers',
    };
    let newPolicy: GetProposalList = new GetProposalList();
    this.showActivePolicy(newPolicy);
  }

  public showActivePolicy(newPolicy: GetProposalList): void {
    let entityCode = sessionStorage.getItem('Entity_Cd')!;
    let newClient: ClientList = new ClientList();
    newClient.Client_Cd = entityCode;

    this.authService.ClientList(newClient).subscribe({
      next: (res: ClientListObj) => {
        // console.log('Client_dt =>', res);
        newPolicy.Client_Cd = newClient.Client_Cd;
        this.fetchProposalList(newPolicy);
      },
      error: (e: ErrorObj) => {
        console.log(e, 'No Active Polices');
      },
    });
  }

  public fetchProposalList(newPolicy: GetProposalList): void {
    newPolicy.Mode = AppEnum.Mode_R;

    this.authService.GetProposalList(newPolicy).subscribe({
      next: (res: Array<ProposalListing>) => {
        this.proposalData = res;
        // console.log('PolicyData =>', res);
        this.getCustomerPolicy();
      },
      error: (e: ErrorObj) => {
        console.error('Error', e);
      },
    });
  }

  public getCustomerPolicy(): void {
    this.policyInsuredData = [];
    if (this.proposalData) {
      this._ActivatedRoute.queryParams.subscribe((params) => {
        if (params['POL_ID'] && params['POL_VER_ID']) {
          const polId = params['POL_ID'];
          const polVerId = params['POL_VER_ID'];

          let customerPolicy: GetPolicyInsured = new GetPolicyInsured();
          customerPolicy.Policy_Id = polId;
          customerPolicy.PolicyVersion_Id = polVerId;

          this.authService.GetPolicyInsured(customerPolicy).subscribe({
            next: (res: PolicyInsuredObj) => {
              let gen;
              if (res.Gender == 'M') {
                gen = "Male";
              } else {
                gen = "Female";
              }
              this.loading = false;
              this.policyInsuredData = [{
                PolicyInsured_Id: res.PolicyInsured_Id || "",
                Full_Nm: res.Full_Nm,
                Relation_Nm: res.Relation_Nm,
                Dob: res.Dob,
                Member_Cd: res.Member_Cd,
                gen: gen,
                Policy_Id: res.Policy_Id,
              }];
            },
            error: (e: ErrorObj) => {
              console.error(e);
            },
          });
        }
      });
    }
  }

  public nominee_details(policyId: string, policyInsuredId: string): void {
    this.router.navigate(['/client/nomiee'], {
      queryParams: {
        "POL_ID": policyId,
        "PolicyInsured_Id": policyInsuredId,
      }
    });
  }
  pre_pg(){
    this.router.navigate(['/client/track-policy']);
  }

}
