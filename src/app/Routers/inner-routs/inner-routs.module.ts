import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('../../Components/Pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'policy-details',
    loadComponent: () => import('../../Components/Pages/policy-details/policy-details.page').then(m => m.PolicyDetailsPage)
  },
  {
    path: 'track-policy',
    loadComponent: () => import('../../Components/Pages/track-policy/track-policy.page').then(m => m.TrackPolicyPage)
  },
  {
    path: 'card-component',
    loadComponent: () => import('../../Components/Common/card-component/card-component.page').then(m => m.CardComponentPage)
  },
  {
    path: 'collapsecardcomponent',
    loadComponent: () => import('../../Components/Common/collapsecardcomponent/collapsecardcomponent.page').then(m => m.CollapsecardcomponentPage)
  },
  {
    path: 'tabcomponent',
    loadComponent: () => import('../../Components/Common/tabcomponent/tabcomponent.page').then(m => m.TabcomponentPage)
  },
  {
    path: 'popup',
    loadComponent: () => import('../../Components/Common/popup/popup.page').then(m => m.PopupPage)
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('../../Components/Common/page-not-found/page-not-found.page').then(m => m.PageNotFoundPage)
  },
  {
    path: 'test',
    loadComponent: () => import('../../Components/Pages/test-page/test-page.page').then(m => m.TestPagePage)
  },
  {
    path: 'nomiee',
    loadComponent: () => import('../../Components/Pages/nomiee/nomiee.page').then(m => m.NomieePage)
  },
  {
    path: 'insured-details',
    loadComponent: () => import('../../Components/Pages/insured-details/insured-details.page').then(m => m.InsuredDetailsPage)
  },
  {
    path: 'life-assured-profile',
    loadComponent: () => import('../../Components/Pages/life-assured-profile/life-assured-profile.page').then(m => m.LifeAssuredProfilePage)
  },
  {
    path: 'paymentgateway',
    loadComponent: () => import('../../Components/Pages/paymentgateway/paymentgateway.page').then(m => m.PaymentgatewayPage)
  },
  {
    path: 'listof-claim',
    loadComponent: () => import('../../Components/Pages/listof-claim/listof-claim.page').then(m => m.LIstofClaimPage)
  },
  {
    path: 'track-the-claim',
    loadComponent: () => import('../../Components/Pages/track-the-claim/track-the-claim.page').then(m => m.TrackTheClaimPage)
  },
  {
    path: 'track-policy-profile',
    loadComponent: () => import('../../Components/Pages/track-policy-profile/track-policy-profile.page').then(m => m.TrackPolicyProfilePage)
  },
  {
    path: 'deferment',
    loadComponent: () => import('../../Components/Pages/deferment/deferment.page').then(m => m.DefermentPage)
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InnerRoutsModule { }
