// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  backendAPI: "http://localhost:8080/",
  backendHostPublic: "http://localhost:8085/api/auth/v1/",
  backendHostEditor: "http://localhost:8085/api/editor/v1/",
  backendHostAppUser: "http://localhost:8085/api/user/v1/",
  backendHostAdmin: "http://localhost:8085/api/admin/v1/"

/*   backendHostPublic: "https://api.bozahouse.com/api/auth/v1/",
  backendHostEditor: "https://api.bozahouse.com/api/editor/v1/",
  backendHostAppUser:"https://api.bozahouse.com/api/user/v1/",
  backendHostAdmin:  "https://api.bozahouse.com/api/admin/v1/" */

};

/*

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
