import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { PostToken, GetValidateEntityCredential, GetProposalList, ClientList, GetPolicyInsured, GetClaimList, GetPolicyNominee, GetClientBank, PostPolicyNominee, PostClient, GetClient, GetPolicyTrusty, PostPolicyTrusty, GetCountry } from '../Models/app.model';
import { PostClientBank, PostClientContact, PostClientProfile, GetPinzip, GetBank, GetBankBranch, GetProducts } from '../Models/app.model';
import { AppResponse, EntityCredentialObj, ProposalListing, ClientListObj, PolicyInsuredObj, PolicyNomineeObj, ClaimSearch, ClientBankObj, ClientObj, PolicyTrustylistObj, PolicyTrustyObj, CountryObj, BankObj, BankBranchObj, PolicyProductObj } from '../Models/app.res.model';
import { ClientBankResponseObj, PostContactResponcesObj, ProfileResponcesObj, PincodeObj } from '../Models/app.res.model';
import { Observable, map } from 'rxjs';
import { AuthClientService } from '../ServiceClients/auth.client.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private authClientService: AuthClientService) { }

  public GetIPAddress() {
    return this.authClientService.GetIPAddress()
      .pipe(map((res: any) => {
        // console.log("auth service GetIPAddress res", JSON.stringify(res));
        return res;
      }));
  }

  public PostToken(req: PostToken): Observable<any> {
    return this.authClientService.PostToken(req)
      .pipe(map((res: AppResponse) => {
        // console.log("auth service PostToken res", JSON.stringify(res));
        return res.ResponseObj.Token;
      }));
  }

  public GetValidateEntityCredential(req: GetValidateEntityCredential): Observable<EntityCredentialObj> {
    return this.authClientService.GetValidateEntityCredential(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.EntityCredentialObj[0];
      }));
  }

  public GetPolicyInsured(req: GetPolicyInsured): Observable<PolicyInsuredObj> {
    return this.authClientService.GetPolicyInsured(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PolicyInsuredObj[0];
      }));
  }

  public ClientList(req: ClientList,): Observable<ClientListObj> {
    return this.authClientService.ClientList(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ClientListObj[0];
      }));
  }

  public GetProposalList(req: GetProposalList): Observable<Array<ProposalListing>> {
    return this.authClientService.GetProposalList(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ProposalListing;
      }));
  }

  public GetClaimList(req: GetClaimList): Observable<Array<ClaimSearch>> {
    return this.authClientService.GetClaimList(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ClaimSearch;
      }));
  }

  public GetPolicyNominee(req: GetPolicyNominee): Observable<PolicyNomineeObj> {
    return this.authClientService.GetPolicyNominee(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PolicyNomineeObj;
      }));
  }

  public PostPolicyNominee(req: PostPolicyNominee): Observable<PolicyNomineeObj> {
    return this.authClientService.PostPolicyNominee(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PolicyNomineeObj;
      }));
  }

  public PostClient(req: PostClient): Observable<any> {
    return this.authClientService.PostClient(req)
      .pipe(map((res: AppResponse) => {
        return res.ErrorObj;
      }));
  }

  public GetClient(req: GetClient): Observable<ClientObj> {
    return this.authClientService.GetClient(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ClientObj[0];
      }));
  }

  public GetPolicyTrusty(req: GetPolicyTrusty): Observable<PolicyTrustylistObj> {
    return this.authClientService.GetPolicyTrusty(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PolicyTrustylistObj;
      }));
  }

  public GetClientBank(req: GetClientBank): Observable<ClientBankObj> {
    return this.authClientService.GetClientBank(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ClientBankObj[0];
      }));
  }

  public PostClientBank(req: PostClientBank): Observable<ClientBankResponseObj> {
    return this.authClientService.PostClientBank(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ClientBankResponseObj;
      }));
  }

  public PostPolicyTrusty(req: PostPolicyTrusty): Observable<PolicyTrustyObj> {
    return this.authClientService.PostPolicyTrusty(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PolicyTrustyObj;
      }));
  }

  public GetCountry(req: GetCountry): Observable<CountryObj> {
    return this.authClientService.GetCountry(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.CountryObj;
      }));
  }

  public GetPinzip(req: GetPinzip): Observable<PincodeObj> {
    return this.authClientService.GetPinzip(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PincodeObj;
      }));
  }

  public PostClientContact(req: PostClientContact): Observable<PostContactResponcesObj> {
    return this.authClientService.PostClientContact(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PostContactResponcesObj;
      }));
  }

  public PostClientProfile(req: PostClientProfile): Observable<ProfileResponcesObj> {
    return this.authClientService.PostClientProfile(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.ProfileResponcesObj;
      }));
  }

  public GetBank(req: GetBank): Observable<BankObj> {
    return this.authClientService.GetBank(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.BankObj;
      }));
  }

  public GetBankBranch(req: GetBankBranch): Observable<BankBranchObj> {
    return this.authClientService.GetBankBranch(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.BankBranchObj[0];
      }));
  }

  public GetProducts(req: GetProducts): Observable<PolicyProductObj> {
    return this.authClientService.GetProducts(req)
      .pipe(map((res: AppResponse) => {
        return res.ResponseObj.PolicyProductObj;
      }));
  }


}
