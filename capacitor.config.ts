import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'customerapp-ionic-base',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'http',
 },
 plugins: {
   CapacitorHttp: {
     enabled: true
   },
   
     "SplashScreen": {
       "launchShowDuration": 2000,
       "launchAutoHide": true,
       // "launchFadeOutDuration": 3000,
       "backgroundColor": "#ffffffff",
       "androidSplashResourceName": "splash",
       "androidScaleType": "CENTER_CROP",
       "showSpinner": true,
       "androidSpinnerStyle": "large",
       "iosSpinnerStyle": "small",
       "spinnerColor": "#999999",
       "splashFullScreen": true,
       "splashImmersive": true,
       "layoutName": "launch_screen",
       "useDialog": true
     }
   }
};

export default config;
