import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { GetPolicyInsured, GetProposalList } from 'src/app/Models/app.model'
import { PolicyInsuredObj, ErrorObj, ProposalListing } from 'src/app/Models/app.res.model'
import { ShareDataService } from 'src/app/Services/share-data.service';
import { AuthDirective } from '../../../Directives/auth.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-policy-profile',
  templateUrl: './track-policy-profile.page.html',
  styleUrls: ['./track-policy-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TrackPolicyProfilePage implements OnInit {

  public title: string = 'Policy Profile';
  public assuredDetails!: { InsuredName: string, Dob: Date, Gender: string, Realtion: string, NricNo: string };
  public assuredPolicyDetails!: { Policy_No: string, Policy_Start_Dt: Date, Policy_End_Dt: Date };
  receivedData: any;

  constructor(private authService: AuthService, private shareData: ShareDataService, private router: Router) {
    this.receivedData = this.shareData.getSharedData();
    AuthDirective.SetTitle(this.title);
  }

  ngOnInit() {

    let newPolicy: GetProposalList = new GetProposalList();
    let clientPolicy: GetPolicyInsured = new GetPolicyInsured();
    this.GetAssuredProfiles(clientPolicy);
    this.assuredDetails = {
      InsuredName: '',
      Dob: new Date(),
      Gender: '',
      Realtion: '',
      NricNo: ''
    };
    this.GetAssuredDetails(newPolicy)
    this.assuredPolicyDetails = {
      Policy_No: '',
      Policy_Start_Dt: new Date(),
      Policy_End_Dt: new Date(),
    }
  }

  public home_page(): void {
    this.router.navigate(['/client/track-policy']);
  }
  public before_pg(): void {
    this.router.navigate(['/client/policy-details']);
  }

  public GetAssuredProfiles(clientPolicy: GetPolicyInsured): void {
    // clientPolicy.Policy_Id = "51467";
    clientPolicy.Policy_Id = this.receivedData;

    this.authService.GetPolicyInsured(clientPolicy).subscribe({
      next: (res: PolicyInsuredObj) => {
        console.log("Policy Profile Data =>   " + JSON.stringify(res))
        let gen;
        if (res.Gender == 'M') {
          gen = "Male"
        } else {
          gen = "Female"
        }
        this.assuredDetails.InsuredName = res.Full_Nm;
        this.assuredDetails.Dob = res.Dob;
        this.assuredDetails.Gender = gen;
        this.assuredDetails.Realtion = res.Relation_Nm
        this.assuredDetails.NricNo = res.UID

      },
      error: (e: ErrorObj) => {
        console.error("Error", e)
      }
    })

  }

  public GetAssuredDetails(newPolicy: GetProposalList): void {
    newPolicy.Client_Cd = sessionStorage.getItem('Entity_Cd')!;

    this.authService.GetProposalList(newPolicy).subscribe({
      next: (res: Array<ProposalListing>) => {
        console.log("policy D" + JSON.stringify(res))
        this.assuredPolicyDetails.Policy_No = res[0].Policy_No;
        this.assuredPolicyDetails.Policy_Start_Dt = res[0].Policy_Start_Dt;
        this.assuredPolicyDetails.Policy_End_Dt = res[0].Policy_End_Dt


      },
      error: (e: ErrorObj) => {
        console.log("Error", e)
      }
    })

  }


}
