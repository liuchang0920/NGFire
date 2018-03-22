// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBQOqJeTWXe9AV4zvQsTOortgFWXCCQQ-g",
    authDomain: "angular-demo-com.firebaseapp.com",
    databaseURL: "https://angular-demo-com.firebaseio.com",
    projectId: "angular-demo-com",
    storageBucket: "gs://angular-demo-com.appspot.com",
    messagingSenderId: "1012883145798"
  }
};
