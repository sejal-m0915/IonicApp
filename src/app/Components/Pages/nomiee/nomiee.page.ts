import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { DataTablesModule } from 'angular-datatables';
import { GetProposalList, ClientList, GetPolicyNominee, PostPolicyNominee, PostClient, GetClient, GetPolicyTrusty, PostPolicyTrusty } from '../../../Models/app.model';
import { ProposalListing, ErrorObj, ClientListObj, PolicyNomineeObj, ClientObj, PolicyTrustylistObj, PolicyTrustyObj } from 'src/app/Models/app.res.model';
import { AppEnum } from '../../../Constants/app.enum';
import { AuthService } from '../../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupPage } from '../../Common/popup/popup.page';
import { EMPTY, catchError, of, switchMap } from 'rxjs';
import { ToastService } from 'src/app/Services/toast.service';
import { AuthDirective } from '../../../Directives/auth.directive';

@Component({
  selector: 'app-nomiee',
  templateUrl: './nomiee.page.html',
  styleUrls: ['./nomiee.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DataTablesModule, ReactiveFormsModule]
})


export class NomieePage implements OnInit {
  dtoptions: DataTables.Settings = {};
  public nomineeData: any[] = [];
  public policyTrustyData: any[] = [];
  public TrustyData: any[] = [];
  public proposalData!: any;
  public clientData!: any;
  public GetClientData!: any;
  public PostClientData!: any;
  public NomineeForm!: FormGroup;
  private policyId!: any;
  private policyInsuredId!: any;
  public IsLoad: boolean = false;
  public PostPolicyNomineeData!: any;
  public errorMessage: string = '';
  private client_cd: any;
  private client_dob: any;
  public loaded = false;
  public loadedTrusty = false;
  public title: string = 'Nominee';
  public TrustyForm!: FormGroup;
  public editedNomineeId: any | null = null;
  public isEditMode: boolean = false;
  public isEditModeTrust: boolean = false;
  public nominee: any;
  public PolicyTrust: any;
  public trustycd: any;
  public trusty_nm: any;
  maxNumLength: number = 10;
  maxNumLength_UID: number = 14;

  constructor(private router: Router, private authService: AuthService, private _ActivatedRoute: ActivatedRoute, private modalController: ModalController, private cdr: ChangeDetectorRef, private toastService: ToastService) {
    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
    let newPolicy: GetProposalList = new GetProposalList();
    this.showActivePolicy(newPolicy);
    this.NomineeForm = new FormGroup({
      Nominee_Nm: new FormControl('', [Validators.required]),
      Share: new FormControl('', [Validators.required]),
      Email1: new FormControl('', [Validators.required]),
      Mobile1: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(10)]),
      NomineeRelation_Cd: new FormControl('', [Validators.required]),
      Nominee_Cd: new FormControl(),
      UID: new FormControl('', [Validators.required]),
      Minor_Ind: new FormControl(false),
    });

    this.TrustyForm = new FormGroup({
      Trusty_Nm: new FormControl('', [Validators.required]),
      TrustyEmail: new FormControl('', [Validators.required, Validators.email]),
      TrustyMobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      TrustyUID: new FormControl('', [Validators.required,]),
      TrustyCd: new FormControl('')
    });

  }

  public Form_refresh(): void {
    this.NomineeForm.reset();
    this.NomineeForm.get('Nominee_Cd')?.enable();
    this.NomineeForm.get('UID')?.enable();
    this.isEditMode = false;
  }

  public Trusty_refresh() {
    this.TrustyForm.reset();
    this.isEditModeTrust = false;
    this.TrustyForm.get('TrustyUID')?.enable();
    this.TrustyForm.get('TrustyCd')?.enable();
  }

  public getRelationName(code: string): string {
    switch (code) {
      case 'R002': return 'Son';
      case 'R003': return 'Spouse';
      case 'R005': return 'Mother';
      case 'R006': return 'Father';
      case 'R007': return 'Daughter';
      default: return '';
    }
  }
  // Input validation
  public Text_field(event: KeyboardEvent): boolean {
    const regex = /[a-z]/i;
    return regex.test(event.key);
  }

  public Numb_field(event: KeyboardEvent): boolean {
    const regex = /[0-9]/;
    if (event.code === 'Backspace' || event.shiftKey || event.code === 'Home' || event.code === 'ArrowLeft' || event.code === 'Tab' || event.code === 'ArrowRight' || event.code === 'ControlLeft' || event.code === 'KeyV' || event.code === 'KeyC') {
      return true;
    }
    return regex.test(event.key) && (event.target as HTMLInputElement).value.length < this.maxNumLength;
  }

  public UID_field(event: KeyboardEvent): boolean {
    const regex = /[0-9]/;
    if (event.code === 'Backspace' || event.shiftKey || event.code === 'Home' || event.code === 'ArrowLeft' || event.code === 'Tab' || event.code === 'ArrowRight' || event.code === 'NumpadSubtract' || event.code === 'Minus' || event.code === 'ControlLeft' || event.code === 'KeyV' || event.code === 'KeyC') {
      return true;
    }
    return regex.test(event.key) && (event.target as HTMLInputElement).value.length < this.maxNumLength_UID;
  }

  public DecimalField(event: KeyboardEvent): boolean {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const key = event.key;
    if (event.code === 'Backspace' || event.shiftKey || event.code === 'Home' || event.code === 'ArrowLeft' || event.code === 'Tab' || event.code === 'ArrowRight') {
      return true;
    }
    if (inputValue.length >= 6) {
      return false;
    }
    if (!/^\d|\.$/.test(key)) {
      return false;
    }
    if (key === '.' && inputValue.includes('.')) {
      return false;
    }
    return true;
  }

  private refreshTable(): void {
    this.cdr.detectChanges();
    // location.reload();
  }

  private async openSuccessPopup(message: string): Promise<void> {
    const modal = await this.modalController.create({
      component: PopupPage,
      componentProps: {
        header: 'Success',
        content: message,
        icon: 'checkmark-circle-outline',
      },
      cssClass: 'custom_modal',
    });
    return await modal.present();
  }

  private async openErrorPopup(errorMessage: string): Promise<void> {
    // console.log('Received error message:', errorMessage);
    const modal = await this.modalController.create({
      component: PopupPage,
      componentProps: {
        header: 'Validation Error',
        content: errorMessage,
        icon: 'alert-circle-outline',
      },
      cssClass: 'custom_modal_error',
    });
    return await modal.present();
  }

  private DeleteNomineeToast(): void {
    this.toastService.presentToast('Your Nominee has been deleted');
  }

  private DeleteTrustyToast(): void {
    this.toastService.presentToast('Your Trusty has been deleted');
  }

  private ShareInvalidToast(): void {
    this.toastService.presentToast('Invalid Share value. Share must be between 1 and 100.');
  }

  private UIDInvalidToast(): void {
    this.toastService.presentToast('UID already exists. Please enter a unique UID.');
  }

  //Nominee form
  get Nominee_Nm(): FormControl {
    return this.NomineeForm.get("Nominee_Nm") as FormControl;
  }
  get Nominee_Cd(): FormControl {
    return this.NomineeForm.get("Nominee_Cd") as FormControl;
  }
  get NomineeRelation_Cd(): FormControl {
    return this.NomineeForm.get("NomineeRelation_Cd") as FormControl;
  }
  get Share(): FormControl {
    return this.NomineeForm.get("Share") as FormControl;
  }
  get Email1(): FormControl {
    return this.NomineeForm.get("Email1") as FormControl;
  }
  get Mobile1(): FormControl {
    return this.NomineeForm.get("Mobile1") as FormControl;
  }
  get Minor_Ind(): FormControl {
    return this.NomineeForm.get("Minor_Ind") as FormControl;
  }
  get UID(): FormControl {
    return this.NomineeForm.get("UID") as FormControl;
  }

  //Trusty form
  get TrustyUID(): FormControl {
    return this.TrustyForm.get("TrustyUID") as FormControl;
  }
  get TrustyEmail(): FormControl {
    return this.TrustyForm.get("TrustyEmail") as FormControl;
  }
  get TrustyMobile(): FormControl {
    return this.TrustyForm.get("TrustyMobile") as FormControl;
  }
  get TrustyName(): FormControl {
    return this.TrustyForm.get("Trusty_Nm") as FormControl;
  }
  get TrustyCd(): FormControl {
    return this.TrustyForm.get("Trusty_Cd") as FormControl;
  }

  public showActivePolicy(newPolicy: GetProposalList): void {
    let entityCode = sessionStorage.getItem("Entity_Cd")!;
    let newClient: ClientList = new ClientList();
    newClient.Client_Cd = entityCode;

    this.authService.ClientList(newClient).subscribe({
      next: (res: ClientListObj) => {
        this.clientData = res;
        newPolicy.Client_Cd = newClient.Client_Cd;
        this.fetchProposalList(newPolicy);
      },
      error: (e: ErrorObj) => {
        console.log(e, "No Active Polices");
      }
    });
  }

  public fetchProposalList(newPolicy: GetProposalList): void {
    newPolicy.Mode = AppEnum.Mode_R;
    this.authService.GetProposalList(newPolicy).subscribe({
      next: (res: ProposalListing[]) => {
        this.proposalData = res;
        let nominee: GetPolicyNominee = new GetPolicyNominee();
        this._ActivatedRoute.queryParams.subscribe((params) => {
          nominee.Policy_Id = params['POL_ID'];
          this.policyId = params['POL_ID'];
          this.policyNominee();
          this.GetPolicyTrusty();
        })
      },
      error: (e: ErrorObj) => {
        console.error('Error', e);
      }
    });
  }

  public policyNominee(): void {
    // debugger;
    let nominee: GetPolicyNominee = new GetPolicyNominee();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      nominee.Policy_Id = params['POL_ID'];
      this.policyId = params['POL_ID'];
      nominee.PolicyInsured_Id = params['PolicyInsured_Id'];
      this.policyInsuredId = params['PolicyInsured_Id'];
    });

    this.nomineeData = [];
    this.refreshTable();
    this.authService.GetPolicyNominee(nominee).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.loaded = true;
        this.nomineeData = res.map((item: PolicyNomineeObj) => ({
          Nominee_Nm: item?.Nominee_Nm || '',
          Dob: item?.Dob || '',
          NomineeRelation_Cd: item?.NomineeRelation_Cd || '',
          Email1: item?.Email1 || '',
          Mobile1: item?.Mobile1 || '',
          Policy_Id: item?.Policy_Id || '',
          UID: item?.UID || '',
          Share: item?.Share || '',
          Nominee_Cd: item?.Nominee_Cd || '',
          Minor_Ind: item?.Minor_Ind !== undefined ? item.Minor_Ind : 0,
        }));
        this.refreshTable();

      },
      error: (e: ErrorObj) => {
        // console.error(e);
      }
    });
  }

  public PostClient(): void {
    // debugger;
    let postClient: PostClient = new PostClient();

    postClient.Mode = AppEnum.Mode_C;
    postClient.Actv_Ind = 1;
    postClient.Flag = "";
    postClient.Type = "Individual";
    postClient.C_Type = "Individual";
    postClient.Category = "Customer";
    postClient.IdType = "NRIC";
    postClient.Same_As_Home = 1;
    postClient.Designation = "Chairman";
    postClient.ISD_Cd = +60;
    postClient.Nationality = "MYS";
    postClient.Country = "Malaysia";

    let newPolicyNomineeObj: PolicyNomineeObj = new PolicyNomineeObj();
    newPolicyNomineeObj.Nominee_Nm = this.NomineeForm.get('Nominee_Nm')?.value;
    postClient.First_Nm = newPolicyNomineeObj.Nominee_Nm;
    newPolicyNomineeObj.Email1 = this.NomineeForm.get('Email1')?.value;
    postClient.Email1 = newPolicyNomineeObj.Email1;
    newPolicyNomineeObj.Mobile1 = this.NomineeForm.get('Mobile1')?.value;
    postClient.cc_Mobile1 = newPolicyNomineeObj.Mobile1;
    newPolicyNomineeObj.UID = this.NomineeForm.get('UID')?.value;
    postClient.UID = newPolicyNomineeObj.UID !== null ? newPolicyNomineeObj.UID.toString() : '';
    const uid = postClient.UID;

    const excludedFields = ['Nominee_Cd', 'Minor_Ind'];

    const isFormEmpty = Object.keys(this.NomineeForm.controls).some(controlName => {
      if (!excludedFields.includes(controlName)) {
        const control = this.NomineeForm.get(controlName);
        return control?.value === null || control?.value === '';
      }
      return false;
    });

    if (isFormEmpty) {
      this.openErrorPopup('Please fill in all required fields.');
      return;
    }
    this.authService.PostClient(postClient).subscribe({
      next: (res: any) => {
        this.PostClientData = res;
        if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1941) {
          this.errorMessage = res[0].ErrorMessage;
          this.toastService.presentToast(this.errorMessage);
          this.NomineeForm.reset();
        } else if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1396 || Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 0) {
          this.GetClient(uid);
        } else if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1) {
          this.openErrorPopup(res[0].ErrorMessage);
        } else if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1222) {
          this.openErrorPopup(res[0].ErrorMessage);
        }
      },
      error: (e: ErrorObj) => {
        if (Array.isArray(e) && e.length > 0) {
          this.openErrorPopup('Please enter proper fields.');
        } else if (typeof e === 'object') {
          this.openErrorPopup(e.ErrorMessage);
        } else {
          this.openErrorPopup(e)
        }
      }
    });
  }

  public GetClient(uid: string): void {
    // debugger;
    let getClient: GetClient = new GetClient();
    getClient.UID = uid;

    this.authService.GetClient(getClient).pipe(
      switchMap((res: ClientObj[] | ClientObj) => {
        // console.log("Get client data", res);
        this.GetClientData = Array.isArray(res) ? res : [res];
        if (this.GetClientData && this.GetClientData.length > 0) {
          this.GetClientData.forEach((client: ClientObj) => {
            if (client && client.Client_Cd) {
              this.client_cd = client.Client_Cd;
              this.client_dob = client.Dob;
            }
          });
        }
        return of(res);
      }),
      catchError((error: any) => {
        console.error('Error in GetClient', error);
        return EMPTY;
      })
    ).subscribe(() => {
      this.NomineeSubmit();
    });
  }

  public NomineeSubmit(): void {
    debugger;
    let newValue: PostPolicyNominee = new PostPolicyNominee();
    newValue.Policy_Id = this.policyId;
    newValue.PolicyInsured_Id = this.policyInsuredId;

    let clientData = this.GetClientData[0];
    let clientDate = this.GetClientData[0].Dob.split('T');
    // console.log(clientDate);

    newValue.Nominee_Cd = clientData;

    if (!newValue.PolicyNomineeObj) {
      newValue.PolicyNomineeObj = [];
    }

    if (this.NomineeForm.valid && this.policyId && this.policyInsuredId) {
      newValue.Mode = AppEnum.Mode_C;
      newValue.Actv_Ind = 1;
      newValue.Flag = "";
      let newPolicyNomineeObj: PolicyNomineeObj = new PolicyNomineeObj();
      newPolicyNomineeObj.Nominee_Nm = this.NomineeForm.get('Nominee_Nm')?.value;
      newPolicyNomineeObj.NomineeRelation_Cd = this.NomineeForm.get('NomineeRelation_Cd')?.value;
      newPolicyNomineeObj.NomineeRelation_Name = this.getRelationName(newPolicyNomineeObj.NomineeRelation_Cd);

      if (!this.NomineeForm.get('Nominee_Nm')?.value ||
        !this.NomineeForm.get('NomineeRelation_Cd')?.value ||
        !this.NomineeForm.get('Share')?.value ||
        !this.NomineeForm.get('Email1')?.value ||
        !this.NomineeForm.get('Mobile1')?.value ||
        !this.NomineeForm.get('UID')?.value) {
        this.openErrorPopup('Please fill in all required fields.');
        return;
      }

      const shareValue = parseFloat(this.NomineeForm.get('Share')?.value);

      if (!isNaN(shareValue) && shareValue > 0 && shareValue <= 100) {
        newPolicyNomineeObj.Share = shareValue;

        const totalShare = this.nomineeData.reduce((acc, nominee) => acc + parseFloat(nominee.Share.toString()), 0) + newPolicyNomineeObj.Share;

        if (totalShare <= 100) {
          newPolicyNomineeObj.Email1 = this.NomineeForm.get('Email1')?.value;
          newPolicyNomineeObj.Mobile1 = this.NomineeForm.get('Mobile1')?.value;
          newPolicyNomineeObj.Minor_Ind = this.NomineeForm.get('Minor_Ind')?.value ? 1 : 0;
          newPolicyNomineeObj.UID = this.NomineeForm.get('UID')?.value;
          newPolicyNomineeObj.Dob = clientDate[0];
          newPolicyNomineeObj.Nominee_Cd = this.GetClientData[0].Client_Cd;
          newPolicyNomineeObj.PolicyInsured_Id = this.policyInsuredId;
          newPolicyNomineeObj.Share = shareValue;

          const UidExists = this.nomineeData.some(item => item.UID === newPolicyNomineeObj.UID);

          if (UidExists) {
            this.UIDInvalidToast();

            if (this.isEditMode) {
              const editedNomineeIndex = this.nomineeData.findIndex(item => item.Nominee_Cd === this.editedNomineeId.Nominee_Cd);
              if (editedNomineeIndex !== -1) {
                const totalShareWithoutEditedNominee = this.nomineeData
                  .map(nominee => nominee.Share)
                  .filter((share, index) => index !== editedNomineeIndex)
                  .reduce((acc, share) => acc + parseFloat(share), 0);

                const newTotalShare = parseFloat(totalShareWithoutEditedNominee) + newPolicyNomineeObj.Share;

                if (newTotalShare <= 100) {
                  this.nomineeData[editedNomineeIndex] = {
                    ...this.nomineeData[editedNomineeIndex],
                    Nominee_Nm: newPolicyNomineeObj.Nominee_Nm,
                    NomineeRelation_Cd: newPolicyNomineeObj.NomineeRelation_Cd,
                    Share: newPolicyNomineeObj.Share,
                    Email1: newPolicyNomineeObj.Email1,
                    Mobile1: newPolicyNomineeObj.Mobile1,
                    Minor_Ind: newPolicyNomineeObj.Minor_Ind
                  };

                  let apiPayload: Partial<PostPolicyNominee> = {
                    Mode: 'E',
                    Policy_Id: this.policyId,
                    Flag: 'UpdateNominee',
                    Actv_Ind: 1,
                    PolicyNomineeObj: [this.nomineeData[editedNomineeIndex]],
                  };

                  this.authService.PostPolicyNominee(apiPayload as PostPolicyNominee).subscribe({
                    next: (res: any) => {
                      // console.log('Nominee updated successfully', res);
                      this.openSuccessPopup('Nominee updated successfully');
                      this.NomineeForm.reset();
                      this.isEditMode = false;
                      this.policyNominee();
                    },
                    error: (e: ErrorObj) => {
                      console.error('Error updating nominee', e);
                    }
                  });
                } else {
                  this.ShareInvalidToast();
                }
              }
            }
          } else {
            newValue.PolicyNomineeObj[0] = newPolicyNomineeObj;

            this.authService.PostPolicyNominee(newValue).subscribe({
              next: (res: PolicyNomineeObj) => {
                this.PostPolicyNomineeData = res;
                // console.log('Data sent to API successfully', res);
                this.openSuccessPopup('Nominee added successfully');

                const newNomineeData = {
                  Nominee_Nm: newPolicyNomineeObj.Nominee_Nm,
                  Nominee_Cd: newPolicyNomineeObj.Nominee_Cd,
                  Dob: newPolicyNomineeObj.Dob,
                  NomineeRelation_Cd: newPolicyNomineeObj.NomineeRelation_Cd,
                  Email1: newPolicyNomineeObj.Email1,
                  Mobile1: newPolicyNomineeObj.Mobile1,
                  Policy_Id: newValue.Policy_Id,
                  PolicyInsured_Id: newValue.PolicyInsured_Id,
                  UID: newPolicyNomineeObj.UID,
                  Share: newPolicyNomineeObj.Share,
                  Minor_Ind: newPolicyNomineeObj.Minor_Ind
                };
                this.nomineeData.push(newNomineeData);
                this.NomineeForm.reset();
                this.fetchNomineeData();
                this.policyNominee();
              },
              error: (e: ErrorObj) => {
                console.error('Error', e);
              }
            });
          }
          this.NomineeForm.reset();
        } else {
          this.NomineeForm.reset();
          this.ShareInvalidToast();
        }
      } else {
        this.NomineeForm.reset();
        this.ShareInvalidToast();
      }
    }
  }

  public Delete_nominee(nominee: any): void {
    // debugger;
    this.NomineeForm.reset();
    this.NomineeForm.get('Nominee_Cd')?.enable();
    this.NomineeForm.get('UID')?.enable();
    if (nominee && nominee.Nominee_Cd) {
      const Nominee_Cd = nominee.Nominee_Cd;
      const Policy_ID = nominee.Policy_Id;

      this.nomineeData = this.nomineeData
        .filter(item => !(item.Nominee_Cd === Nominee_Cd && item.Policy_Id === Policy_ID));

      let Del_nominee: Partial<PostPolicyNominee> = {
        Mode: "D",
        Policy_Id: Policy_ID,
        Flag: "",
        Actv_Ind: 1,
        PolicyNomineeObj: [{ Nominee_Cd: Nominee_Cd } as PolicyNomineeObj]
      };

      this.authService.PostPolicyNominee(Del_nominee as PostPolicyNominee).subscribe({
        next: (res: any) => {
          // console.log('Nominee deleted successfully', res);
          this.refreshTable();
          this.DeleteNomineeToast();
        },
        error: (e: ErrorObj) => {
          console.error('Error deleting nominee', e);
        }
      });
      this.Form_refresh();
    } else {
      console.error('Nominee object is undefined or does not have Nominee_Cd property');
    }
  }

  public Edit_nominee(nominee: any): void {

    this.isEditMode = true;

    this.editedNomineeId = nominee;
    if (this.NomineeForm) {
      this.NomineeForm.patchValue({
        Nominee_Cd: nominee.Nominee_Cd,
        Nominee_Nm: nominee.Nominee_Nm,
        NomineeRelation_Cd: nominee.NomineeRelation_Cd,
        Share: nominee.Share,
        Email1: nominee.Email1,
        Mobile1: nominee.Mobile1,
        UID: nominee.UID,
        Minor_Ind: nominee.Minor_Ind,
      });
    }
    this.NomineeForm.get('Nominee_Cd')?.disable();
    this.NomineeForm.get('UID')?.disable();
  }

  public Save_nominee(): void {
    // debugger;
    this.NomineeForm.get('Nominee_Cd')?.enable();
    this.NomineeForm.get('UID')?.enable();

    const editedNomineeData = this.NomineeForm.value;

    if (this.isEditMode) {
      const editedNominee = this.nomineeData.find(item => item.UID === editedNomineeData.UID);

      if (editedNominee) {
        const newTotalShare = this.calculateNewTotalShare(editedNomineeData);
        if (newTotalShare <= 100) {
          this.updateNomineeAndSave(editedNominee, editedNomineeData);
        } else {
          this.openErrorPopup("Total share exceeds 100.");
          this.Form_refresh();
        }
      }
    }
  }

  private calculateNewTotalShare(editedNomineeData: any): number {
    const totalShareWithoutEditedNominee = this.nomineeData
      .filter(nominee => nominee.UID !== editedNomineeData.UID)
      .reduce((acc, nominee) => acc + parseFloat(nominee.Share), 0);

    return totalShareWithoutEditedNominee + parseFloat(editedNomineeData.Share);
  }

  private updateNomineeAndSave(editedNominee: any, editedNomineeData: any): void {
    if (parseFloat(editedNomineeData.Share) === parseFloat(editedNominee.Share)) {
    }

    if (!isNaN(parseFloat(editedNomineeData.Share)) && parseFloat(editedNomineeData.Share) > 0 && parseFloat(editedNomineeData.Share) <= 100) {
      const minorIndValue = editedNomineeData.Minor_Ind ? 1 : 0;
      editedNominee.Minor_Ind = minorIndValue;
      editedNominee.Nominee_Nm = editedNomineeData.Nominee_Nm;
      editedNominee.Email1 = editedNomineeData.Email1;
      editedNominee.NomineeRelation_Cd = editedNomineeData.NomineeRelation_Cd;
      editedNominee.Mobile1 = editedNomineeData.Mobile1;
      editedNominee.Share = editedNomineeData.Share;

      const apiPayload: Partial<PostPolicyNominee> = {
        Mode: 'E',
        Policy_Id: editedNominee.Policy_Id,
        Flag: 'UpdateNominee',
        Actv_Ind: 1,
        PolicyNomineeObj: [{
          ...editedNominee,
          Share: parseFloat(editedNominee.Share),
          Minor_Ind: minorIndValue,
        }],
      };

      this.authService.PostPolicyNominee(apiPayload as PostPolicyNominee).subscribe({
        next: (res: any) => {
          // console.log('Nominee updated successfully. API response:', res);
          this.openSuccessPopup('Nominee updated successfully');
          this.NomineeForm.reset();
          this.refreshTable();
          this.isEditMode = false;
        },
        error: (error: any) => {
          console.error('Error updating nominee:', error);
        },
      });
    } else {
      // console.log('Share is invalid. Value:', editedNomineeData.Share);
      this.ShareInvalidToast();
      this.Form_refresh();
    }
  }

  private fetchNomineeData(): void {
    let nominee: GetPolicyNominee = new GetPolicyNominee();
    nominee.Policy_Id = this.policyId;
    nominee.PolicyInsured_Id = this.policyInsuredId

    this.authService.GetPolicyNominee(nominee).subscribe({
      next: (res: any) => {
        // console.log('private fetch nominee data:', res);
        this.nomineeData = res.map((item: PolicyNomineeObj) => ({
          Nominee_Nm: item.Nominee_Nm || '',
          Nominee_Cd: item.Nominee_Cd || '',
          Dob: item.Dob || '',
          NomineeRelation_Cd: item.NomineeRelation_Cd || '',
          Email1: item.Email1 || '',
          Mobile1: item.Mobile1 || '',
          Policy_Id: item.Policy_Id || '',
          PolicyInsured_Id: item.PolicyInsured_Id || '',
          Share: item.Share || '',
          UID: item.UID || '',
          Minor_Ind: item.Minor_Ind || '',
        }));
        this.refreshTable();
      },
      error: (e: ErrorObj) => {
        console.error(e);
      },
    });
  }

  public PostClient_trusty(): void {
    debugger;
    let postClient_trusty: PostClient = new PostClient();
    postClient_trusty.Mode = AppEnum.Mode_C;
    postClient_trusty.Actv_Ind = 1;
    postClient_trusty.Flag = "";
    postClient_trusty.Type = "Individual";
    postClient_trusty.C_Type = "Individual";
    postClient_trusty.Category = "Customer";
    postClient_trusty.IdType = "NRIC";
    postClient_trusty.Same_As_Home = 1;
    postClient_trusty.Designation = "Chairman";
    postClient_trusty.ISD_Cd = +60;
    postClient_trusty.Nationality = "MYS";
    postClient_trusty.Country = "Malaysia";


    let newPolicyTrustyObj: PolicyTrustyObj = new PolicyTrustyObj();
    newPolicyTrustyObj.Trusty_nm = this.TrustyForm.get('Trusty_Nm')?.value;
    postClient_trusty.First_Nm = newPolicyTrustyObj.Trusty_nm;
    newPolicyTrustyObj.Email1 = this.TrustyForm.get('TrustyEmail')?.value;
    postClient_trusty.Email1 = newPolicyTrustyObj.Email1;
    newPolicyTrustyObj.Mobile1 = this.TrustyForm.get('TrustyMobile')?.value;
    postClient_trusty.cc_Mobile1 = newPolicyTrustyObj.Mobile1;
    newPolicyTrustyObj.UID = this.TrustyForm.get('TrustyUID')?.value;
    postClient_trusty.UID = newPolicyTrustyObj.UID !== null ? newPolicyTrustyObj.UID.toString() : '';
    const uid = postClient_trusty.UID;

    this.authService.PostClient(postClient_trusty).subscribe({
      next: (res: any) => {
        // this.PostClientData = res;
        // console.log("Client Post", res);
        if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1941) {
          this.errorMessage = res[0].ErrorMessage;
          this.toastService.presentToast(this.errorMessage);
          this.TrustyForm.reset();
        } else if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1396 || Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 0) {
          this.GetClient_trusty(uid);
        } else if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1) {
          this.openErrorPopup(res[0].ErrorMessage);
        } else if (Array.isArray(res) && res.length > 0 && res[0].ErrorCode === 1222) {
          this.openErrorPopup(res[0].ErrorMessage);
        }
      },
      error: (e: ErrorObj) => {
        if (Array.isArray(e) && e.length > 0) {
          this.openErrorPopup('Enter proper validate fields');
        } else if (typeof e === 'object') {
          this.openErrorPopup(e.ErrorMessage);
        } else {
          // console.error('Invalid error response format:', e);
          this.openErrorPopup(e)
        }
      }
    });
  }

  public GetClient_trusty(uid: string): void {
    // debugger;
    let getClient_trusty: GetClient = new GetClient();
    getClient_trusty.UID = uid;

    this.authService.GetClient(getClient_trusty).pipe(
      switchMap((res: ClientObj[] | ClientObj) => {
        // console.log("Get client data", res);
        this.GetClientData = Array.isArray(res) ? res : [res];
        if (this.GetClientData && this.GetClientData.length > 0) {
          this.GetClientData.forEach((client: ClientObj) => {
            if (client && client.Client_Cd) {
              this.client_cd = client.Client_Cd;
              // console.log(this.client_cd);
            }
          });
        }
        return of(res);
      }),
      catchError((error: any) => {
        console.error('Error in GetClient', error);
        return EMPTY;
      })
    ).subscribe(() => {
      if (this.GetClientData && this.GetClientData.length > 0) {
        const client = this.GetClientData[0];
        if (client && client.Client_Cd) {
          this.trustycd = client.Client_Cd;
        }
        if (client && client.First_Nm) {
          this.trusty_nm = client.First_Nm;
        }
      }
      this.PostPolicy_Trusty();
    });

  }

  public PostPolicy_Trusty(): void {
    // debugger;

    if (this.TrustyForm.valid) {
      const newUID = this.TrustyForm.value.TrustyUID;

      const isDuplicateUID = this.policyTrustyData.some(trusty => trusty.UID === newUID);

      if (isDuplicateUID) {
        this.UIDInvalidToast();
        this.TrustyForm.reset();
        return;
      } else {
        let trusty: PostPolicyTrusty = {
          Mode: AppEnum.Mode_C,
          Policy_Id: this.policyId,
          Flag: "",
          Actv_Ind: 1,
          PolicyTrustyObj: [{
            Trusty_nm: this.trusty_nm,
            Trusty_Cd: this.trustycd,
            UID: newUID,
            Email1: this.TrustyForm.value.TrustyEmail,
            Mobile1: this.TrustyForm.value.TrustyMobile,
            PolicyInsured_Id: this.policyInsuredId,
          }]
        };

        this.authService.PostPolicyTrusty(trusty).subscribe({
          next: (res: PolicyTrustyObj) => {
            // console.log("API Response:", res);
            this.PolicyTrust = res;
            this.GetPolicyTrusty();
            this.openSuccessPopup('Trustee is added Successfully.')
            this.refreshTable();
          },
          error: (e: ErrorObj) => {
            console.error("Error", e);
          }
        });

        this.TrustyForm.reset();
      }
    } else {
      this.openErrorPopup('Enter Required Fields');
      console.error('Form is not valid');
    }
  }

  public GetPolicyTrusty(): void {
    // debugger;
    let trusty: GetPolicyTrusty = new GetPolicyTrusty();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      trusty.Policy_Id = params['POL_ID'];
      this.policyId = params['POL_ID'];
      trusty.PolicyInsured_Id = params['PolicyInsured_Id'];
      this.policyInsuredId = params['PolicyInsured_Id'];
    })
    this.policyTrustyData = [];
    this.refreshTable();
    this.authService.GetPolicyTrusty(trusty).subscribe({
      next: (res: PolicyTrustylistObj[] | PolicyTrustylistObj) => {
        // console.log("Get Policy trusty ", res);
        if (Array.isArray(res)) {
          this.loadedTrusty = true;
          this.policyTrustyData = res.map(item => ({
            Trusty_nm: item.Trusty_nm || '',
            Email1: item.Email1 || '',
            Mobile1: item.Mobile1 || '',
            UID: item.UID || '',
            Policy_Id: item.Policy_Id || '',
            Trusty_Cd: item.Trusty_Cd || '',
          }));
        } else {
          this.policyTrustyData = [{
            Trusty_nm: res.Trusty_nm || '',
            Email1: res.Email1 || '',
            Mobile1: res.Mobile1 || '',
            UID: res.UID || '',
            Policy_Id: res.Policy_Id || '',
            Trusty_Cd: res.Trusty_Cd || '',
          }];
        }
        this.refreshTable();
      },
      error: (e: ErrorObj) => {
        // console.error(e);
      }
    });
  }

  public Delete_trusty(trusty: any): void {
    // debugger;
    this.Trusty_refresh();

    if (trusty && trusty.UID && trusty.Policy_Id) {
      const UID = trusty.UID;
      const Policy_ID = trusty.Policy_Id;

      this.TrustyData = this.TrustyData
        .filter((item: { UID: any; Policy_Id: any; }) => !(item.UID === UID && item.Policy_Id === Policy_ID));

      let Del_trusty: Partial<PostPolicyTrusty> = {
        Mode: "D",
        Policy_Id: Policy_ID,
        Flag: "",
        Actv_Ind: 1,
        PolicyTrustyObj: [{ UID: UID } as PolicyTrustyObj]
      };

      this.authService.PostPolicyTrusty(Del_trusty as PostPolicyTrusty).subscribe({
        next: (res: any) => {
          this.DeleteTrustyToast();
          this.GetPolicyTrusty();
        },
        error: (e: ErrorObj) => {
          console.error('Error deleting trusty', e);
        }
      });
    } else {
      this.openErrorPopup('Invalid or missing UID or Policy_ID for trusty deletion');
    }
  }

  public Edit_trusty(trusty: any): void {
    this.isEditModeTrust = true;

    this.TrustyForm.patchValue({
      TrustyCd: trusty.Trusty_Cd,
      Trusty_Nm: trusty.Trusty_nm,
      TrustyEmail: trusty.Email1,
      TrustyMobile: trusty.Mobile1,
      TrustyUID: trusty.UID,
    });
    this.TrustyForm.get('TrustyCd')?.disable();
    this.TrustyForm.get('TrustyUID')?.disable();
  }

  public Save_trusty(): void {
    // debugger;
    this.TrustyForm.get('TrustyCd')?.enable();
    this.TrustyForm.get('TrustyUID')?.enable();

    const trustyForm = this.TrustyForm.value;

    if (this.TrustyForm.valid) {
      const newUID = trustyForm.TrustyUID;
      const existingTrusty = this.policyTrustyData.find(trusty => trusty.UID === newUID);
      if (existingTrusty) {

        const editedTrusty: Partial<PostPolicyTrusty> = {
          Mode: "E",
          Policy_Id: this.policyId,
          Flag: "UpdateTrustee",
          Actv_Ind: 1,
          PolicyTrustyObj: [{
            Trusty_nm: trustyForm.Trusty_Nm,
            Email1: trustyForm.TrustyEmail,
            Mobile1: trustyForm.TrustyMobile,
            UID: existingTrusty.UID,
            Trusty_Cd: existingTrusty.Trusty_Cd,
            PolicyInsured_Id: this.policyInsuredId
          }]
        };

        this.authService.PostPolicyTrusty(editedTrusty as PostPolicyTrusty).subscribe({
          next: (res: PolicyTrustyObj) => {
            // console.log("API Response:", res);
            this.PolicyTrust = res;
            this.GetPolicyTrusty();
            this.openSuccessPopup('Trustee is updated Successfully.')
            this.Trusty_refresh();
          },
          error: (e: ErrorObj) => {
            console.error("Error", e);
          }
        });
      }
    } else {
      this.openErrorPopup('Enter Required Fields');
      console.error('Form is not valid');
    }
  }
  pre_pg() {
    this.router.navigate(['/client/track-policy']);
  }
  next_pg() {
    this.router.navigate(['/client/insured-details']);
  }

}
