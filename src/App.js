import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import store from './store';
import registerScreens from './screens';
import { Navigation as nv } from './ui';
import { initInternetConnection } from './actions/network';
import { initLang, existLang } from './actions/lang';
import { autoLogin } from './actions/authActions';
import SplashScreen from 'react-native-splash-screen';
import { getSlider } from './actions/slider';

export const startApp = () => {
  registerScreens();
  SplashScreen.hide();

  axios.interceptors.request.use(
    config => {
      const { token } = store.getState().auth;
      const { lang } = store.getState().lang;
      return {
        ...config,
        headers: {
          ...config.headers,
          lang: lang,
          Authorization: token
            ? `Bearer ${token}`
            : config.headers.Authorization,
        },
      };
    },

    error => {
      Promise.reject(error);
    },
  );
  Navigation.registerComponent('paynas', () => registerScreens);
  Navigation.events().registerAppLaunchedListener(async () => {
    nv.setNavigationDefaultOptions();
    await initLang('en', false)(store.dispatch);
    initInternetConnection(store.dispatch);
    const exist = await autoLogin()(store.dispatch, store.getState);

    if (exist) {
      nv.init('MAIN_STACK', {
        rtl: store.getState().lang.rtl,
        sideMenu: 'SideMenu',
            name: 'Home',
        // name: 'AddSell',

      });
    } else {
      nv.init('MAIN_STACK', {
        name: 'Login',
        // name: 'AboutUs1',
      });
    }
  });
};

