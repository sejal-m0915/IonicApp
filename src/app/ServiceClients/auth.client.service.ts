import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment"
import { PostToken, GetValidateEntityCredential, GetProposalList, ClientList, GetPolicyInsured, GetPolicyNominee, GetClaimList, PostClientBank, GetClient, PostClientContact, PostClientProfile, PostPolicyNominee, PostClient, GetPolicyTrusty, PostPolicyTrusty, GetCountry, GetPinzip, GetBank, GetBankBranch, GetProducts } from '../Models/app.model';
import { AppResponse } from '../Models/app.res.model';
import { AuthDirective } from '../Directives/auth.directive';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private http: HttpClient) { }

  public GetIPAddress(): Observable<any> {
    return this.http.get<any>(environment.API_Endpoints.AbstractApi);
  }

  public PostToken(req: PostToken): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Admin/Token`, req);
  }

  public GetValidateEntityCredential(req: GetValidateEntityCredential): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Entity/ValidateEntityCredential?${params}`);
  }

  public ClientList(req: ClientList): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Entity/ClientList?${params}`);
  }

  public GetProposalList(req: GetProposalList): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/ProposalList?${params}`);
  }

  public GetPolicyInsured(req: GetPolicyInsured): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/PolicyInsured?${params}`);
  }

  public GetPolicyNominee(req: GetPolicyNominee): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/PolicyNominee?${params}`)
  }

  public GetClaimList(req: GetClaimList): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Claims/ClaimList?${params}`)
  }

  public GetClientBank(req: GetClaimList): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Medical/ClientBank?${params}`)
  }

  public PostPolicyNominee(req: PostPolicyNominee): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/PolicyNominee?`, req);
  }

  public PostClient(req: PostClient): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Entity/Client?`, req);
  }

  public GetPolicyTrusty(req: GetPolicyTrusty): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/PolicyTrusty?${params}`)
  }

  public PostPolicyTrusty(req: PostPolicyTrusty): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/PolicyTrusty?`, req);
  }

  public GetClient(req: GetClient): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Entity/Client?${params}`)
  }

  public GetCountry(req: GetCountry): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/General/Country?${params}`)
  }

  public GetPinzip(req: GetPinzip): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/General/Pincode?${params}`)
  }

  public PostClientBank(req: PostClientBank): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Medical/ClientBank`, req)
  }

  public PostClientContact(req: PostClientContact): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Entity/Contact`, req)
  }

  public PostClientProfile(req: PostClientProfile): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Entity/Profile`, req)
  }

  public GetBank(req: GetBank): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/General/Bank?${params}`)
  }

  public GetBankBranch(req: GetBankBranch): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/General/BankBranch?${params}`)
  }

  public GetProducts(req: GetProducts): Observable<AppResponse> {
    const params = AuthDirective.QueryBilder(req);
    return this.http.get<AppResponse>(`${environment.API_Endpoints.LifeAPI_UAT}/api/Policy/PolicyProduct?${params}`)
  }

}
