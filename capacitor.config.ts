import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.filmder.ionic',
  appName: 'Filmder',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '594455133700-9mncrvto2cnnqg0tk1bfo0bf4pjp0598.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

// 594455133700-9mncrvto2cnnqg0tk1bfo0bf4pjp0598.apps.googleusercontent.com

export default config;
// 33:35:12:83:5A:B1:75:8F:65:11:F0:B9:96:27:AF:AB:9B:8E:78:D4
