import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { GetClient, GetClientBank, PostClientBank, PostClientContact, PostClientProfile, GetCountry, GetPinzip, PostClient, GetBank, GetBankBranch } from 'src/app/Models/app.model';
import { ClientBankObj, ClientBankResponseObj, ClientObj, ErrorObj, PostContactResponcesObj, ProfileResponcesObj, CountryObj, PincodeObj, BankObj, BankBranchObj } from 'src/app/Models/app.res.model';
import { AuthService } from '../../../Services/auth.service';
import { AuthDirective } from '../../../Directives/auth.directive';
import { AppEnum } from 'src/app/Constants/app.enum';
import { PopupPage } from '../../Common/popup/popup.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ProfilePage implements OnInit {

  public title: string = 'Profile';
  public bankData!: any;
  public currentActive: string = 'one';
  public ProfileForms!: FormGroup;
  public getclientData!: any;
  public countryList!: any;
  public isEditMode: boolean = false;
  public post_Client!: any;
  public post_Contact!: any;
  public post_Bank: ClientBankResponseObj | undefined;
  public loading = false;
  public pinZip!: string;
  public maxNumLength: number = 10;
  public maxNumLengthAcc: number = 14;
  public postalLength: number = 5;
  public pinZipValue: string = '';
  public postContact: PostClientContact = new PostClientContact();
  public banks: BankObj[] = [];
  public selectedBankCd!: any;
  public selectedBankId!: any;
  public bankBranch!: any;
  public select_bank = false;
  public inpt_bank = true;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private modalController: ModalController, private router: Router) {
    AuthDirective.SetTitle(this.title);
  }

  public openTab(Active: string): void {
    this.currentActive = Active;
  }

  public tabs = [
    { id: 'one', label: 'Profile' },
    { id: 'two', label: 'Contact' },
    { id: 'three', label: 'Bank Details' },
    // { id: 'four', label: 'Premium Payment' },
  ];

  private profileLable(controlName: string): string {
    switch (controlName) {
      case 'First_Nm':
        return 'Name';
      case 'NRIC':
        return 'NRIC';
      case 'Dob':
        return 'Date of Birth';
      case 'Marital_Status':
        return 'Marital status';
      case 'Gender':
        return 'Gender';
      case 'Nationality':
        return 'Nationality';
      default:
        return controlName;
    }
  }

  private contactLable(controlName: string): string {
    switch (controlName) {
      case 'Mobile1':
        return 'Mobile';
      case 'Email1':
        return 'Email';
      case 'Address_Line1':
        return 'Address';
      case 'Pin_Zip':
        return 'Postal Code';
      default:
        return controlName;
    }
  }

  private bankLabel(controlName: string): string {
    switch (controlName) {
      case 'Bank_Nm':
        return 'Bank Name';
      case 'Account_No':
        return 'Account Number ';
      default:
        return controlName;
    }
  }


  // Form Get in Profile forms
  //Profile
  get First_Nm(): FormControl {
    return this.ProfileForms.get("First_Nm") as FormControl;
  }
  get NRIC(): FormControl {
    return this.ProfileForms.get("NRIC") as FormControl;
  }
  get Dob(): FormControl {
    return this.ProfileForms.get("Dob") as FormControl;
  }
  get Marital_Status(): FormControl {
    return this.ProfileForms.get("Marital_Status") as FormControl;
  }
  get Gender(): FormControl {
    return this.ProfileForms.get("Gender") as FormControl;
  }
  get Nationality(): FormControl {
    return this.ProfileForms.get("Nationality") as FormControl;
  }

  //Contact
  get Mobile1(): FormControl {
    return this.ProfileForms.get("Mobile1") as FormControl;
  }
  get Email1(): FormControl {
    return this.ProfileForms.get("Email1") as FormControl;
  }
  get Address_Line1(): FormControl {
    return this.ProfileForms.get("Address_Line1") as FormControl;
  }
  get Pin_Zip(): FormControl {
    return this.ProfileForms.get("Pin_Zip") as FormControl;
  }
  get City_Nm(): FormControl {
    return this.ProfileForms.get("City_Nm") as FormControl;
  }
  get State_Nm(): FormControl {
    return this.ProfileForms.get("State_Nm") as FormControl;
  }
  get Country(): FormControl {
    return this.ProfileForms.get("Country") as FormControl;
  }

  //Bank
  get Bank_Type(): FormControl {
    return this.ProfileForms.get("Bank_Type") as FormControl;
  }
  get Bank_Nm(): FormControl {
    return this.ProfileForms.get("Bank_Nm") as FormControl;
  }
  get Bank_Branch_Cd(): FormControl {
    return this.ProfileForms.get("Bank_Branch_Cd") as FormControl;
  }
  get Account_No(): FormControl {
    return this.ProfileForms.get("Account_No") as FormControl;
  }
  get Swift_Cd(): FormControl {
    return this.ProfileForms.get("Swift_Cd") as FormControl;
  }
  //End of form get
  ngOnInit() {
    this.loadData();
    this.GetCountry();
    this.loadBanks();
    this.ProfileForms = this.formBuilder.group({

      profile: this.formBuilder.group({
        First_Nm: new FormControl('', [Validators.required]),
        NRIC: new FormControl('', [Validators.required]),
        Dob: new FormControl('', [Validators.required]),
        Marital_Status: new FormControl('', [Validators.required]),
        Gender: new FormControl('', [Validators.required]),
        Nationality: new FormControl(''),
      }),

      contact: this.formBuilder.group({
        Mobile1: new FormControl('', [Validators.required]),
        Email1: new FormControl('', [Validators.required]),
        Address_Line1: new FormControl('', [Validators.required]),
        Pin_Zip: new FormControl('', [Validators.required]),
        City_Nm: new FormControl(''),
        State_Nm: new FormControl(''),
        Country: new FormControl(''),
      }),

      bank: this.formBuilder.group({
        Bank_Nm: new FormControl('', [Validators.required]),
        Bank_Cd: new FormControl(''),
        Bank_Type: new FormControl(''),
        Bank_Branch_Cd: new FormControl(''),
        Account_No: new FormControl('', [Validators.required]),
        Swift_Cd: new FormControl(''),
      }),
    });
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

  //Validations For Inputs
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

  public Account_field(event: KeyboardEvent): boolean {
    const regex = /[0-9]/;
    if (event.code === 'Backspace' || event.shiftKey || event.code === 'Home' || event.code === 'ArrowLeft' || event.code === 'Tab' || event.code === 'ArrowRight' || event.code === 'ControlLeft' || event.code === 'KeyV' || event.code === 'KeyC') {
      return true;
    }
    return regex.test(event.key) && (event.target as HTMLInputElement).value.length < this.maxNumLengthAcc;
  }

  public Postal_code(event: KeyboardEvent): boolean {
    const regex = /[0-9]/;
    if (event.code === 'Backspace' || event.code === 'ArrowLeft' || event.code === 'Tab' || event.code === 'ArrowRight' || event.code === 'ControlLeft' || event.code === 'KeyV' || event.code === 'KeyC') {
      return true;
    }
    return regex.test(event.key) && (event.target as HTMLInputElement).value.length < this.postalLength;
  }

  //Function for Edit Inputs
  public Edit_form(): void {
    this.isEditMode = true;
    this.ProfileForms.enable();
    this.ProfileForms.get('profile.NRIC')?.disable();
    this.ProfileForms.get('profile.Dob')?.disable();
    this.ProfileForms.get('contact.City_Nm')?.disable();
    this.ProfileForms.get('contact.Country')?.disable();
    this.ProfileForms.get('contact.State_Nm')?.disable();
    this.ProfileForms.get('bank.Bank_Type')?.disable();
    this.ProfileForms.get('bank.Bank_Branch_Cd')?.disable();
    this.ProfileForms.get('bank.Swift_Cd')?.disable();
    // this.select_bank = true;
    // this.inpt_bank = false;
  }

  public cancelEdit(): void {
    this.isEditMode = false;
    this.ProfileForms.disable();
    this.loadData();
  }

  public home_page(): void {
    this.router.navigate(['/client/track-policy']);
  }

  public loadData(): void {
    const getClient: GetClient = new GetClient();
    getClient.Client_Cd = sessionStorage.getItem('Entity_Cd')!;

    this.authService.GetClient(getClient).subscribe({
      next: (res: ClientObj) => {
        this.getclientData = res;
        // console.log("Client Data =>", res);
        //Profile
        getClient.First_Nm = res.First_Nm || '';
        getClient.NRIC = res.NRIC || '';
        getClient.Dob = res.Dob || '';
        getClient.Marital_Status = res.Marital_Status || '';
        getClient.Gender = res.Gender || '';
        getClient.Nationality = res.Nationality || '';

        //Contact
        getClient.Mobile1 = res.Mobile1 || '';
        getClient.Email1 = res.Email1 || '';
        getClient.Address_Line1 = res.Address_Line1 || '';
        getClient.Pin_Zip = res.Pin_Zip || '';
        getClient.City_Nm = res.City_Nm || '';
        getClient.State_Nm = res.State_Nm || '';
        getClient.Country = res.Country || '';

        // console.log(getClient);

        //Profile
        this.ProfileForms.get('profile')!.patchValue({
          First_Nm: getClient.First_Nm,
          NRIC: getClient.NRIC,
          Dob: getClient.Dob.toLocaleString().slice(0, 10),
          Marital_Status: getClient.Marital_Status,
          Gender: getClient.Gender,
          Nationality: getClient.Nationality,
        });

        //Contact
        this.ProfileForms.get('contact')!.patchValue({
          Mobile1: getClient.Mobile1,
          Email1: getClient.Email1,
          Address_Line1: getClient.Address_Line1,
          Pin_Zip: getClient.Pin_Zip,
          City_Nm: getClient.City_Nm,
          State_Nm: getClient.State_Nm,
          Country: getClient.Country,
        });

        this.ProfileForms.disable();
      },
      error: (e: ErrorObj) => {
        console.error("Error =>", e);
      }
    });

    const getBank: GetClientBank = new GetClientBank();
    getBank.Client_Cd = sessionStorage.getItem('Entity_Cd')!;

    this.authService.GetClientBank(getBank).subscribe({
      next: (res: ClientBankObj) => {
        this.bankData = res;
        // console.log(this.bankData);

        //Bank
        getBank.Bank_Nm = res.Bank_Nm || '';
        getBank.Bank_Type = res.Bank_Type || '';
        getBank.Bank_Branch_Cd = res.Bank_Branch_Cd || '';
        getBank.Account_No = res.Account_No || '';
        getBank.Swift_Cd = res.Swift_Cd || '';

        this.ProfileForms.get('bank')!.patchValue({
          Bank_Nm: getBank.Bank_Nm,
          Bank_Type: getBank.Bank_Type,
          Bank_Branch_Cd: getBank.Bank_Branch_Cd,
          Account_No: getBank.Account_No,
          Swift_Cd: getBank.Swift_Cd,
        });

        this.ProfileForms.disable();
      },
      error: (e: ErrorObj) => {
        console.error("Error =>", e);
      }
    });

  }

  public GetCountry(): void {
    let getcountry: GetCountry = new GetCountry();
    this.authService.GetCountry(getcountry).subscribe({
      next: (res: CountryObj) => {
        this.countryList = res;
      },
      error: (e: ErrorObj) => {
        console.error("Error =>", e);
      }
    })
  }

  public onSubmitProfile(): void {
    debugger;
    const profileGroup = this.ProfileForms.get('profile') as FormGroup;
    if (profileGroup.valid) {
      const postProfile: PostClientProfile = {
        client_Cd: sessionStorage.getItem('Entity_Cd')!,
        flag: 'Profile',
        first_Nm: profileGroup.get('First_Nm')?.value,
        nric: profileGroup.get('NRIC')?.value,
        dob: profileGroup.get('Dob')?.value,
        marital_Status: profileGroup.get('Marital_Status')?.value,
        gender: profileGroup.get('Gender')?.value,
        nationality: profileGroup.get('Nationality')?.value,
      };

      this.authService.PostClientProfile(postProfile).subscribe({
        next: (res: ProfileResponcesObj) => {
          this.post_Client = res;
          // console.log('API Response:', res);
          this.openSuccessPopup('Profile has been updated Successfully.');
          this.ProfileForms.disable();
          this.isEditMode = false;
        },
        error: (e: ErrorObj) => {
          console.log('Error', e);
        }
      });
    } else {
      const errorMessages: string[] = [];

      Object.keys(profileGroup.controls).forEach((controlName) => {
        const control = profileGroup.get(controlName);
        if (control?.invalid) {
          const label = this.profileLable(controlName);
          const errorMessage = `<b>${label}</b>: Enter Valid Input. <br/>`;
          errorMessages.push(errorMessage);
        }
      });

      if (errorMessages.length > 0) {
        const combinedErrorMessage = errorMessages.join('');
        this.openErrorPopup(combinedErrorMessage);
      }

    }
  }

  public onSubmitContact(): void {
    debugger;

    const postContact: PostClientContact = new PostClientContact();
    const contactGroup = this.ProfileForms.get('contact') as FormGroup;

    if (contactGroup.valid) {
      postContact.client_Cd = sessionStorage.getItem('Entity_Cd')!;
      postContact.flag = 'Contact';
      postContact.mobile1 = contactGroup.get('Mobile1')?.value;
      postContact.email1 = contactGroup.get('Email1')?.value;
      postContact.address_Line1 = contactGroup.get('Address_Line1')?.value;
      postContact.pin_Zip = contactGroup.get('Pin_Zip')?.value;
      postContact.city_Nm = contactGroup.get('City_Nm')?.value;
      postContact.State_Nm = contactGroup.get('State_Nm')?.value;
      postContact.country = contactGroup.get('Country')?.value;

      this.authService.PostClientContact(postContact).subscribe({
        next: (res: PostContactResponcesObj) => {
          this.post_Contact = res;
          // console.log('API Response:', res);
          this.openSuccessPopup('Contact has been updated Successfully.');
          this.ProfileForms.disable();
          this.isEditMode = false;
        },
        error: (e: ErrorObj) => {
          console.log('Error', e)
        }
      });

    } else {
      const errorMessages: string[] = [];

      Object.keys(contactGroup.controls).forEach((controlName) => {
        const control = contactGroup.get(controlName);
        if (control?.invalid) {
          const label = this.contactLable(controlName);
          const errorMessage = `<b>${label}</b>: Enter Valid Input. <br/>`;
          errorMessages.push(errorMessage);
        }
      });

      if (errorMessages.length > 0) {
        const combinedErrorMessage = errorMessages.join('');
        this.openErrorPopup(combinedErrorMessage);
      }
    }
  }

  public GetPinzip(event: any): void {
    debugger;
    const pinZipValue = event.target.value;
    const pinZipControl = this.ProfileForms.get('contact.Pin_Zip');

    if (pinZipValue.length === 0) {
      this.clearCityStateCountryFields();
      return;
    }

    if (pinZipControl?.value) {
      if (pinZipValue.length === 0) {
        this.clearCityStateCountryFields();
        return;
      }

      this.authService.GetPinzip(pinZipValue).subscribe({
        next: (res: PincodeObj[] | PincodeObj) => {
          if (Array.isArray(res)) {
            const filteredResults = res.filter(item => item.Pin_Zip === pinZipValue);

            if (filteredResults.length > 0) {
              const city = filteredResults[0].City_Nm;
              const state = filteredResults[0].State_Nm;
              const country = filteredResults[0].Country_Nm;

              this.setCityStateCountryValues(city, state, country);
              this.postContact.State_Nm = state;
            } else {
              this.clearCityStateCountryFields();
            }
          } else {
            if (res?.Pin_Zip === pinZipValue) {
              const city = res?.City_Nm;
              const state = res?.State_Nm;
              const country = res?.Country_Nm;

              this.setCityStateCountryValues(city, state, country);

              this.postContact.State_Nm = state;
            } else {
              this.clearCityStateCountryFields();
            }
          }
        },
        error: (e: ErrorObj) => {
          console.error('Error searching postal code:', e);
          this.clearCityStateCountryFields();
        }
      });

    }
  }

  private clearCityStateCountryFields(): void {
    this.ProfileForms.get('contact.City_Nm')?.setValue('');
    this.ProfileForms.get('contact.State_Nm')?.setValue('');
    this.ProfileForms.get('contact.Country')?.setValue('');
  }

  private setCityStateCountryValues(city: string, state: string, country: string): void {
    this.ProfileForms.get('contact.City_Nm')?.setValue(city);
    this.ProfileForms.get('contact.State_Nm')?.setValue(state);
    this.ProfileForms.get('contact.Country')?.setValue(country);
  }

  public loadBanks(): void {
    let getBank: GetBank = new GetBank();

    this.authService.GetBank(getBank).subscribe({
      next: (res: BankObj[] | BankObj) => {
        if (Array.isArray(res)) {
          this.banks = res;
          // console.log(res)
        } else {
          this.banks = [res];
        }
      },
      error: (error) => {
        console.error('Error loading banks:', error);
      },
    });
  }

  public onBankSelect(event: any): void {
    const selectedBank_Nm: string = event.target.value;

    if (!selectedBank_Nm) {
      const bankGroup = this.ProfileForms.get('bank') as FormGroup;
      bankGroup.get('Bank_Type')?.setValue("");
      bankGroup.get('Bank_Branch_Cd')?.setValue("");
      bankGroup.get('Swift_Cd')?.setValue("");

      return; // No need to proceed further
    }

    if (selectedBank_Nm) {
      const selectedBank = this.banks.find(bank => bank.Bank_Nm === selectedBank_Nm);
      if (selectedBank) {
        this.selectedBankCd = selectedBank.Bank_Cd;
        // console.log('Selected Bank code', this.selectedBankCd);
        this.selectedBankId = selectedBank.Id;
        // console.log('Selected bank ID', this.selectedBankId);
        const bankGroup = this.ProfileForms.get('bank') as FormGroup;
        bankGroup.get('Bank_Cd')?.setValue(this.selectedBankCd);
        this.OnClickBranchCd();
      }
    }
  }

  public OnClickBranchCd(): void {
    debugger;
    if (this.selectedBankCd) {
      let branchCd: GetBankBranch = new GetBankBranch();
      branchCd.Bank_Cd = this.selectedBankCd;

      this.authService.GetBankBranch(branchCd).subscribe({
        next: (res: BankBranchObj[] | BankBranchObj) => {
          if (Array.isArray(res)) {
            console.error('Multiple branches returned. Please handle accordingly.');
          } else {
            this.bankBranch = res;
            // console.log('Bank Branch Response:', this.bankBranch);
            const bankGroup = this.ProfileForms.get('bank') as FormGroup;
            if (bankGroup) {
              bankGroup.get('Bank_Type')?.patchValue(this.bankBranch.Bank_Type);
              bankGroup.get('Bank_Branch_Cd')?.patchValue(this.bankBranch.Bank_Branch_Cd);
              bankGroup.get('Swift_Cd')?.patchValue(this.bankBranch.Swift_Cd);
            }
          }
        },
        error: (error) => {
          console.error('Error loading banks:', error);
        },
      });
    } else {
      console.error('Please select a bank before clicking on Branch Code.');
    }
  }

  public onSubmitBank(): void {
    debugger;
    // this.OnClickBranchCd();
    const postBank: PostClientBank = new PostClientBank();

    const bankGroup = this.ProfileForms.get('bank') as FormGroup;

    if (bankGroup.valid) {
      postBank.bank_Cd = this.selectedBankCd;
      postBank.client_Cd = sessionStorage.getItem('Entity_Cd')!;
      postBank.mode = AppEnum.Mode_U;
      postBank.actv_Ind = 1;
      postBank.flag = 'string';
      postBank.id = this.selectedBankId;
      postBank.bank_Nm = bankGroup.get('Bank_Nm')?.value;
      postBank.bank_Type = bankGroup.get('Bank_Type')?.value;
      postBank.bank_Branch_Cd = bankGroup.get('Bank_Branch_Cd')?.value;
      postBank.account_No = bankGroup.get('Account_No')?.value;
      postBank.swift_Cd = bankGroup.get('Swift_Cd')?.value;

      // console.log(postBank);

      this.authService.PostClientBank(postBank).subscribe({
        next: (res: ClientBankResponseObj) => {
          this.post_Bank = res;
          // console.log(this.post_Bank);
          this.openSuccessPopup('Bank is updated Successfully.');
          this.ProfileForms.disable();
          this.isEditMode = false;
        },
        error: (e: ErrorObj) => {
          console.error('Error', e);
        }
      });
    } else {
      const errorMessages: string[] = [];

      Object.keys(bankGroup.controls).forEach((controlName) => {
        const control = bankGroup.get(controlName);
        if (control?.invalid) {
          const label = this.bankLabel(controlName);
          const errorMessage = `<b>${label}</b>: Enter Valid Input. <br/>`;
          errorMessages.push(errorMessage);
        }
      });

      if (errorMessages.length > 0) {
        const combinedErrorMessage = errorMessages.join('');
        this.openErrorPopup(combinedErrorMessage);
      }
    }

  }

}


