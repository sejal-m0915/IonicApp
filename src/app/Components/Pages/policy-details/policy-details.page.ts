import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPolicyInsured, GetProposalList, GetProducts } from 'src/app/Models/app.model';
import { ErrorObj, PolicyInsuredObj, ProposalListing, PolicyProductObj } from 'src/app/Models/app.res.model';
import { ShareDataService } from 'src/app/Services/share-data.service';
import { AuthDirective } from '../../../Directives/auth.directive';
import { HttpClient } from '@angular/common/http';
import { AppEnum } from 'src/app/Constants/app.enum';
import { data } from 'jquery';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.page.html',
  styleUrls: ['./policy-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PolicyDetailsPage implements OnInit {

  public title: string = 'Policy Details';
  public assuredDetails!: { InsuredName: string, Dob: Date, Gender: string, Relation: string, NricNo: string };
  public assuredPolicyDetails!: { Policy_No: string, Policy_Start_Dt: Date, Policy_End_Dt: Date };
  receivedData: any;
  private policyNo: any;
  public activePlans: any;
  // public activePlans!: any;
  public showActivePlans = true;
  public showSelectPlans = false;
  public showPremiumBudget: boolean = false;
  public showSelectDropdown: boolean = false;
  public plan: any;
  public _Activeplans!: FormGroup;
  public PremiumForm!: FormGroup;
  public DropdwForm!: FormGroup;
  public rangeData: any;
  public premiumRate: any;
  public selectedPremium: number = 0;
  filteredData: any;
  public sliderValue!: number;
  public gender!: string;
  public ageYear!: number;
  public smokingInd!: boolean;

  constructor(private authService: AuthService, private shareData: ShareDataService, private _ActivatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.receivedData = this.shareData.getSharedData();
    // console.log(" Received Data " + this.receivedData);

    // console.log("Setting title to: ", this.title);
    AuthDirective.SetTitle(this.title);
  }

  get Premium(): FormControl {
    return this._Activeplans.get("Premium") as FormControl;
  }

  get Product_Nm(): FormControl {
    return this._Activeplans.get("Product_Nm") as FormControl;
  }

  get Cover_Type(): FormControl {
    return this._Activeplans.get("Cover_Type") as FormControl;
  }


  // ngOnInit(): void {
  //   let newPolicy: GetProposalList = new GetProposalList();
  //   let clientPolicy: GetPolicyInsured = new GetPolicyInsured();
  //   this.GetAssuredProfiles(clientPolicy);
  //   this.assuredDetails = {
  //     InsuredName: '',
  //     Dob: new Date(),
  //     Gender: '',
  //     Relation: '',
  //     NricNo: ''
  //   };
  //   this.GetAssuredDetails(newPolicy)
  //   this.assuredPolicyDetails = {
  //     Policy_No: '',
  //     Policy_Start_Dt: new Date(),
  //     Policy_End_Dt: new Date(),
  //   }

  //   this.GetActivePlans();


  //   this._Activeplans = this.formBuilder.group({

  //     PremiumForm: this.formBuilder.group({
  //       Premium: new FormControl('', [Validators.required]),
  //       Product_Nm: new FormControl('', [Validators.required]),
  //       Cover_Type: new FormControl('', [Validators.required]),
  //     }),

  //     DropdwForm: this.formBuilder.group({
  //       Premium: new FormControl('', [Validators.required]),
  //       Product_Nm: new FormControl('', [Validators.required]),
  //       Cover_Type: new FormControl('', [Validators.required]),
  //     }),

  //   })

  //   // this.PremiumForm.get('Product_Nm')?.disable();


  //   this.PremiumData();
  // }

  ngOnInit(): void {
    let newPolicy: GetProposalList = new GetProposalList();
    let clientPolicy: GetPolicyInsured = new GetPolicyInsured();

    // Call GetAssuredProfiles to get the data dynamically
    this.GetAssuredProfiles(clientPolicy);

    // Initialize assuredDetails with default values (will be updated after GetAssuredProfiles completes)
    this.assuredDetails = {
      InsuredName: '',
      Dob: new Date(),
      Gender: '',
      Relation: '',
      NricNo: ''
    };

    // Call GetAssuredDetails to get policy details
    this.GetAssuredDetails(newPolicy);

    // Initialize assuredPolicyDetails with default values (will be updated after GetAssuredDetails completes)
    this.assuredPolicyDetails = {
      Policy_No: '',
      Policy_Start_Dt: new Date(),
      Policy_End_Dt: new Date(),
    };

    // Call GetActivePlans to get active plans
    this.GetActivePlans();

    // Initialize your form groups and call other necessary functions
    this._Activeplans = this.formBuilder.group({
      PremiumForm: this.formBuilder.group({
        Premium: new FormControl('', [Validators.required]),
        Product_Nm: new FormControl('', [Validators.required]),
        Cover_Type: new FormControl('', [Validators.required]),
      }),
      DropdwForm: this.formBuilder.group({
        Premium: new FormControl('', [Validators.required]),
        Product_Nm: new FormControl('', [Validators.required]),
        Cover_Type: new FormControl('', [Validators.required]),
      }),
    });

    // Call any other necessary functions
    this.PremiumData();
  }


  pinFormatter(value: number) {
    return `${value}%`;
  }

  public reset_page(): void {
    this.showSelectPlans = false;
    this.showActivePlans = true;
  }

  public home_page(): void {
    this.router.navigate(['/client/track-policy']);
  }

  // public next_Page(): void {
  //   this.router.navigate(['client/track-policy-profile']);
  // }

  // public GetAssuredProfiles(clientPolicy: GetPolicyInsured): void {

  //   this._ActivatedRoute.queryParams.subscribe((params) => {
  //     clientPolicy.Policy_Id = params['POL_ID']
  //     this.policyNo = params['POL_ID'];
  //   })

  //   this.authService.GetPolicyInsured(clientPolicy).subscribe({
  //     next: (res: PolicyInsuredObj) => {
  //       let gen;
  //       if (res.Gender == 'M') {
  //         gen = "Male"
  //       } else {
  //         gen = "Female"
  //       }
  //       this.assuredDetails.InsuredName = res.Full_Nm;
  //       this.assuredDetails.Dob = res.Dob;
  //       this.assuredDetails.Gender = gen;
  //       this.assuredDetails.Relation = res.Relation_Nm
  //       this.assuredDetails.NricNo = res.UID
  //       console.log('Policy Insured Data', res)
  //       this.processData(res);
  //     },
  //     error: (e: ErrorObj) => {
  //       console.error("Error", e)
  //     }
  //   })
  // }

  // public GetAssuredDetails(newPolicy: GetProposalList): void {
  //   newPolicy.Client_Cd = sessionStorage.getItem('Entity_Cd')!;
  //   newPolicy.Policy_Id = this.policyNo
  //   this.authService.GetProposalList(newPolicy).subscribe({
  //     next: (res: Array<ProposalListing>) => {
  //       this.assuredPolicyDetails.Policy_No = res[0].Policy_No;
  //       this.assuredPolicyDetails.Policy_Start_Dt = res[0].Policy_Start_Dt;
  //       this.assuredPolicyDetails.Policy_End_Dt = res[0].Policy_End_Dt;
  //       console.log("Policy details ", res)
  //     },
  //     error: (e: ErrorObj) => {
  //       console.log("Error", e)
  //     }
  //   })
  // }

  // public GetActivePlans(): void {
  //   let ActivePlans: GetProducts = new GetProducts();

  //   ActivePlans.Policy_Id = this.policyNo;

  //   this.authService.GetProducts(ActivePlans).subscribe({
  //     next: (res: PolicyProductObj) => {
  //       this.activePlans = res;
  //       console.log(this.activePlans);
  //     }
  //   });
  // }


  public GetAssuredProfiles(clientPolicy: GetPolicyInsured, gender?: any, ageYear?: any, smokingInd?: any): void {
    if (gender !== undefined && ageYear !== undefined && smokingInd !== undefined) {
      // Update clientPolicy with additional parameters
      clientPolicy.Gender = gender;
      clientPolicy.Age_Year = ageYear;
      clientPolicy.Smoking_Ind = smokingInd;
    }

    this._ActivatedRoute.queryParams.subscribe((params) => {
      clientPolicy.Policy_Id = params['POL_ID'];
      this.policyNo = params['POL_ID'];
    });

    this.authService.GetPolicyInsured(clientPolicy).subscribe({
      next: (res: PolicyInsuredObj) => {
        let gen;
        if (res.Gender == 'M') {
          gen = "Male";
        } else {
          gen = "Female";
        }
        this.assuredDetails.InsuredName = res.Full_Nm;
        this.assuredDetails.Dob = res.Dob;
        this.assuredDetails.Gender = gen;
        this.assuredDetails.Relation = res.Relation_Nm;
        this.assuredDetails.NricNo = res.UID;
        console.log('Policy Insured Data', res);
        this.processData(res);

        // Call GetAssuredDetails with Intermediary_Cd
        if (gender !== undefined && ageYear !== undefined && smokingInd !== undefined) {
          this.GetAssuredDetails(this.policyNo);
        }
      },
      error: (e: ErrorObj) => {
        console.error("Error", e);
      }
    });
  }

  public GetAssuredDetails(policyNo: any, intermediaryCd?: any): void {
    if (intermediaryCd !== undefined) {
      let newPolicy: GetProposalList = new GetProposalList();
      newPolicy.Client_Cd = sessionStorage.getItem('Entity_Cd')!;
      newPolicy.Policy_Id = policyNo;
      newPolicy.Intermediary_Cd = intermediaryCd;

      this.authService.GetProposalList(newPolicy).subscribe({
        next: (res: Array<ProposalListing>) => {
          this.assuredPolicyDetails.Policy_No = res[0].Policy_No;
          this.assuredPolicyDetails.Policy_Start_Dt = res[0].Policy_Start_Dt;
          this.assuredPolicyDetails.Policy_End_Dt = res[0].Policy_End_Dt;
          console.log("Policy details ", res);

          // Call GetActivePlans with product_nm
          if (res.length > 0) {
            this.GetActivePlans(res[0].Product_Nm);
          }
        },
        error: (e: ErrorObj) => {
          console.log("Error", e);
        }
      });
    }
  }

  public GetActivePlans(productNm?: string): void {
    if (productNm !== undefined) {
      let ActivePlans: GetProducts = new GetProducts();
      ActivePlans.Policy_Id = this.policyNo;
      ActivePlans.Product_Nm = productNm;

      this.authService.GetProducts(ActivePlans).subscribe({
        next: (res: PolicyProductObj) => {
          this.activePlans = res;
          console.log(this.activePlans);
        }
      });
    }
  }


  public selectPlans(plan: any): void {
    // debugger;
    this.showActivePlans = false;
    this.showSelectPlans = true;

    if (plan.Product_Cd === 'HSB1') {
      this.showPremiumBudget = false;
      this.showSelectDropdown = true;
    } else {
      this.showPremiumBudget = true;
      this.showSelectDropdown = false;
    }

    // debugger;
    if (!this._Activeplans || !this._Activeplans.get || !this._Activeplans.get('PremiumForm')) {
      console.error('_Activeplans or PremiumForm is undefined');
      return;
    }
    this._Activeplans.get('PremiumForm.Product_Nm')?.disable();
    this._Activeplans.get('PremiumForm.Cover_Type')?.disable();
    this._Activeplans.get('DropdwForm.Product_Nm')?.disable();
    this._Activeplans.get('DropdwForm.Cover_Type')?.disable();
    this._Activeplans.get('PremiumForm.Product_Nm')?.setValue(plan.Product_Nm);
    this._Activeplans.get('PremiumForm.Premium')?.setValue(plan.Premium);
    this._Activeplans.get('PremiumForm.Cover_Type')?.setValue(plan.Cover_Type);
    this._Activeplans.get('DropdwForm.Premium')?.setValue(plan.Premium);
    this._Activeplans.get('DropdwForm.Product_Nm')?.setValue(plan.Product_Nm);
    this._Activeplans.get('DropdwForm.Cover_Type')?.setValue(plan.Cover_Type);

    this.selectedPremium = plan.Premium;
  }

  //Json has been called  
  public PremiumData(): void {
    this.http.get('assets/data/TLPremiumRate.json').subscribe({
      next: (data) => {
        this.premiumRate = data;
        console.log('JSON Data:', this.premiumRate);
      },
      error: (ErrorObj) => {
        console.error(ErrorObj);
      }
    });
  }

  public sliderChanged(event: any): void {
    console.log('Slider value changed:', event.detail.value);
    // Assign the slider value to the class-level variable
    this.sliderValue = event.detail.value;
    // Call the filterJSONData method with the assigned values
    this.filterJSONData(this.sliderValue, this.gender, this.ageYear, this.smokingInd);
  }

  public filterJSONData(sliderValue: number, gender: string, ageYear: number, smokingInd: boolean) {
    // Filter data based on the provided parameters
    this.filteredData = this.premiumRate.filter((item: any) => {
      return item.sliderValue === sliderValue && item.gender === gender && item.ageYear === ageYear && item.smokingInd === smokingInd;
    });
  }
  public processData(data: any): void {
    //policy insured data
    // console.log('Processed data', data);
    data.Age_Year;
    data.Smoking_Ind;
    data.Gender;


  }
}
