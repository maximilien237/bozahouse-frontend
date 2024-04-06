// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
/*  backendHostPublic: "http://vps91824.serveur-vps.net:8085/api/auth/v1/",
  backendHostEditor: "http://vps91824.serveur-vps.net:8085/api/editor/v1/",
  backendHostAppUser: "http://vps91824.serveur-vps.net:8085/api/user/v1/",
  backendHostAdmin: "http://vps91824.serveur-vps.net:8085/api/admin/v1/"*/

  backendAPI: "http://localhost:8085/api/v1/",
  backendHostPublic: "http://localhost:8085/api/auth/v1/",
  backendHostEditor: "http://localhost:8085/api/editor/v1/",
  backendHostAppUser: "http://localhost:8085/api/user/v1/",
  backendHostAdmin: "http://localhost:8085/api/admin/v1/"

};

/*

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
