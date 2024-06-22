import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CardComponentPage } from '../../Common/card-component/card-component.page';
import {
  PostToken,
  GetToken,
  GetValidateEntityCredential,
  GetIPAddress,
} from 'src/app/Models/app.model';
import {
  Token,
  EntityCredentialObj,
  ErrorObj,
} from 'src/app/Models/app.res.model';
import { AppEnum } from 'src/app/Constants/app.enum';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../Services/auth.service';
import { AuthDirective } from '../../../Directives/auth.directive';
import { StorageService } from 'src/app/Services/storage.service';
import { PopupPage } from '../../../Components/Common/popup/popup.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, CardComponentPage],
})
export class LoginPage implements OnInit {
  protected showOtp: boolean = false;
  protected showlogin: boolean = true;
  public title: string = 'Login';
  public LoginForm!: FormGroup;
  public Token!: PostToken;
  public ResToken!: GetToken;
  public User!: GetValidateEntityCredential;
  public Message!: string;
  public passwordVisible = false;
  public showPasswordIconFlag = false;

  constructor(
    private _storage: StorageService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
  ) {

    AuthDirective.SetTitle(this.title)
  }

  ngOnInit() {
    this._storage.clear();
    this.Token = new PostToken();
    this.LoginForm = this.formBuilder.group({
      User_Nm: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  public ValidationPass(event: KeyboardEvent): boolean {
    // debugger;
    const regex = /^[a-zA-Z0-9@!#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/;
    if (event.code === 'Backspace' || event.shiftKey || event.code === 'Home' || event.code === 'ArrowLeft' || event.code === 'Tab' || event.code === 'ArrowRight' || event.code === 'ControlLeft' || event.code === 'KeyV' || event.code === 'KeyC') {
      return true;
    }
    return regex.test(event.key)

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

  public otpToggle(): void {
    this.showOtp = true;
    this.showlogin = false;
  }

  public BackBtnToggle(): void {
    this.showOtp = false;
    this.showlogin = true;
  }

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public showPasswordIcon(): void {
    this.showPasswordIconFlag = true;
  }

  public login(): void {
    this.router.navigate(['client/track-policy']);
    this.showlogin = true;
    this.showOtp = false;
  }

  public onSubmit(): void {
    // debugger;
    this.LoginForm.get('User_Nm')?.markAsTouched();
    this.LoginForm.get('Password')?.markAsTouched();

    if (this.LoginForm.valid) {
      this.Token = new PostToken();
      this.Token.User_Type = environment.User_Type;
      this.Token.User_Nm = 'IndividualB2C';
      this.Token.Password = 'BGXmtw06xNWmSmfwLmrTPw==';

      this.authService.GetIPAddress().subscribe({
        next: (res: GetIPAddress) => {
          this.Token.Ip_Address = res.Ip_address;
          this.Token.Application_Source = environment.Application_Source;
          this.Token.Is_External = true;
          this.Token.Secret_Key = AppEnum.AuthSecret_Key;

          this.authService.PostToken(this.Token).subscribe({
            next: (res: Token) => {

              this._storage.set('Access_Token', res.Access_Token);
              console.log('Access_Token', res.Access_Token);
              this._storage.set('Refresh_Token', res.Refresh_Token);

              this.User = new GetValidateEntityCredential();
              this.User.User_Nm = this.LoginForm.get('User_Nm')?.value;
              this.User.Flag = '1';
              this.User.Type = environment.Type;
              this.User.Password = this.LoginForm.get('Password')?.value;

              this.authService.GetValidateEntityCredential(this.User).subscribe({
                next: (res: EntityCredentialObj) => {
                  // this._storage.set('Entity Code', res.Entity_Cd);
                  // this._storage.set('Entity Name', res.Entity_Nm);
                  sessionStorage.setItem("Entity_Cd", res.Entity_Cd);
                  sessionStorage.setItem("Entity_Nm", res.Entity_Nm);
                  this.showOtp = true;
                  this.showlogin = false;
                  this.LoginForm.reset();
                },
                error: (e: ErrorObj) => {
                  // console.error(e);
                  this.openErrorPopup('Enter Valid User and Password');
                  this.LoginForm.reset();
                },
              });
            },
            error: (error: any) => {
              let ResErrObj = [];
              console.error('PostToken', error);
              if (error != undefined) {
                for (let i = 0; i < error.length; i++) {
                  ResErrObj.push(error[i].ErrorMessage);
                }
              }
            },
          });
          this._storage.set("IsAuth", true);
        },
        error: (e: ErrorObj) => {
          console.error(e);
        },
      });
    }
  }
}
