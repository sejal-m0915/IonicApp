// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_Endpoints: {
    TuneAPI: "https://localhost:44351",
    TuneAPI_UAT: "https://sandbox.enoviq.com/tuneapi_UAT",
    LifeAPI_UAT: "https://uat-lifeapi.tuneprotect.com",

    AbstractApi: "https://ipgeolocation.abstractapi.com/v1",
  },

  Application_Source: "IndividualB2C",
  Application_Name: "Tune",
  User_Type: "Employee",
  DateFormat: "yyyy-MM-DDTHH:mm:ss",
  Type: 'Individual',
  AESKey: "a244bc2be4245c022748235a46dedf15",
  InitialisationVector: "26744a68b53dd87bb395584c00f7290a",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
