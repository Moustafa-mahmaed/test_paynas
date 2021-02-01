import { BackHandler, Platform, Dimensions } from 'react-native';
import { Navigation as NativeNavigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import store from '../store';
import { Provider } from 'react-redux';
import colors from './defaults/colors';
import { showInfo } from './utils/localNotifications';
// import I18n from 'react-native-i18n';
// import {CHANGE_MENU_STATUS} from '../actions/types';

const { width } = Dimensions.get('window');

class Navigation {
  static MAIN_STACK = 'MAIN_STACK';
  static ORDER_STACK = 'ORDER_STACK';
  static menuComponentId = 0;

  static INITED = false;

  static lastCommand = '';

  static currentTabID = '';

  static modalIsOn = false;

  static currentScreen = '';

  static prevScreen = '';

  static backHandler;

  static didAppearListener;

  static commandCompletedListener;

  static didDisappearListener;
  static rtl = true;
  static count = 0;
  constructor() {
    throw new Error('Cannot construct singleton');
  }

  static setNavigationDefaultOptions = () => {
    NativeNavigation.setDefaultOptions({
      statusBar: {
        visible: true,
        // style: Platform.Version < 23 ? "light" : "dark",
        backgroundColor: colors.statusBar,
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      layout: {
        backgroundColor: 'transparent',
        orientation: ['portrait'],
      },
      bottomTab: {
        selectedIconColor: colors.primary,
        selectedTextColor: colors.primary,
        textColor: 'gray',
        iconColor: 'gray',
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysShow', //alwaysHide ،showWhenActive, alwaysShow
        visible: true,
        // hideShadow: true,
        // backgroundColor: '#F8941E',
        elevation: 5,
      },
      // animations: {
      //   push: {
      //     waitForRender: true,
      //   },
      //   showModal: {
      //     waitForRender: true,
      //   },
      // },
    });
  };

  // register screen with  gesturHandler
  static registerScreen(name, component) {
    NativeNavigation.registerComponentWithRedux(
      name,
      () => gestureHandlerRootHOC(component),
      Provider,
      store,
    );
  }

  static registerBackHandlerListener = () => {
    Navigation.backHandler = BackHandler;
    Navigation.backHandler.addEventListener('hardwareBackPress', async () => {
      try {
        await Navigation.pop();
      } catch (error) {
        if (this.count === 0) {
          this.count += 1;
          showInfo(
            this.rtl
              ? 'انقر نقرا سريعا مرة أخري للخروج'
              : 'Press back again to exit the app',
          );
        } else if (this.count === 1) {
          BackHandler.exitApp();
        }
        setTimeout(() => {
          this.count = 0;
        }, 2000);
        return false;
      }

      return true;
    });
  };

  static clearBackHandlerListener = () => {
    if (Navigation.backHandler) {
      this.backHandler.removeEventListener();
    }
  };

  static registerDidAppearListener = () => {
    Navigation.didAppearListener = NativeNavigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        Navigation.currentScreen = componentName;
        this.currentComponentId = componentId;
      },
    );
  };

  static clearDidAppearListener = () => {
    if (Navigation.didAppearListener) {
      Navigation.didAppearListener.remove();
    }
  };

  static registerDidDisappearListener = () => {
    Navigation.didDisappearListener = NativeNavigation.events().registerComponentDidDisappearListener(
      ({ componentName }) => {
        Navigation.prevScreen = componentName;
      },
    );
  };

  static clearDidDisappearListener = () => {
    if (Navigation.didDisappearListener) {
      Navigation.didDisappearListener.remove();
    }
  };

  static registerCommandCompletedListener = () => {
    Navigation.commandCompletedListener = NativeNavigation.events().registerCommandCompletedListener(
      ({ commandId }) => {
        Navigation.lastCommand = commandId.replace(/[0-9]/g, '');

        if (Navigation.lastCommand === 'showModal') {
          Navigation.modalIsOn = true;
        } else if (
          Navigation.lastCommand === 'dismissModal' ||
          Navigation.lastCommand === 'dismissAllModals'
        ) {
          Navigation.modalIsOn = false;
        }
      },
    );
  };

  static clearCommandCompletedListener = () => {
    if (Navigation.commandCompletedListener) {
      Navigation.commandCompletedListener.remove();
    }
  };

  static getScreenLayout = layout => {
    // cosnt screenName = '';

    if (typeof layout === 'string') {
      return {
        component: {
          name: layout,
          options: {
            statusBar: { backgroundColor: colors.statusBar, style: 'dark' },
          },
        },
      };
    }
    if (typeof layout === 'object') {
      return {
        component: {
          name: layout.name,
          passProps: layout.passProps,
          options: {
            statusBar: { backgroundColor: colors.statusBar, style: 'dark' },
          },
        },
      };
    }
  };

  static getBottomTabsLayout = layout => {
    if (typeof layout !== 'object') {
      return null;
    }
    if (!layout.bottomTabs) {
      return null;
    }

    const children = layout.bottomTabs.map((tab, index) => {
      // if (index === 0) {
      return {
        stack: {
          id: tab.screen,
          children: [
            {
              component: {
                id: tab.screen,
                name: tab.screen,
                options: {
                  bottomTab: {
                    icon: tab.icon,
                    text: tab.text,
                  },
                },
              },
            },
          ],
        },
      };
      // } else {
      //   return {
      //     component: {
      //       id: tab.screen,
      //       name: tab.screen,
      //       passProps: tab.passProps,
      //       options: {
      //         bottomTab: {
      //           // text: tab.label,
      //           icon: tab.icon,
      //           iconInsets: tab.icon,
      //           dotIndicator: {color: 'red', visible: true},
      //           IconInsets: {bottom: 0},
      //           badge: 5,
      //           selectedIcon: 50,
      //         },
      //         bottomTabs: {
      //           visible: true,
      //         },
      //       },
      //     },
      //   };
      // }
    });
    return {
      bottomTabs: {
        id: 'bottomTabs',
        children: children,
      },
    };
  };

  static getSideMenuLayout = layout => {
    if (typeof layout !== 'object') {
      return null;
    }
    if (!layout.sideMenu) {
      return null;
    }

    const menu = {};

    if (typeof layout.rtl === 'boolean') {
      if (layout.rtl) {
        menu.right = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: { backgroundColor: colors.statusBar, style: 'light' },
            },
          },
        };
        Navigation.menuDirection = 'right';
      } else {
        menu.left = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: { backgroundColor: colors.statusBar, style: 'light' },
            },
          },
        };
        Navigation.menuDirection = 'left';
      }
    } else if (Navigation.menuDirection) {
      if (Navigation.menuDirection === 'right') {
        menu.right = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: { backgroundColor: colors.statusBar, style: 'light' },
            },
          },
        };
      } else if (Navigation.menuDirection === 'left') {
        menu.left = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: { backgroundColor: colors.statusBar, style: 'light' },
            },
          },
        };
      }
    }

    Navigation.menuComponentId += 1;

    const MainLayout = layout.bottomTabs
      ? Navigation.getBottomTabsLayout(layout)
      : Navigation.getScreenLayout(layout);

    return {
      sideMenu: {
        id: `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        center: {
          stack: {
            children: [{ ...MainLayout }],
          },
        },
        ...menu,
        options: {
          statusBar: this.defaultStatusBar,
          sideMenu: {
            left: {
              width: width * 0.75,
              // height: height * 0.9,
            },
            right: {
              width: width * 0.75,
              // height: height * 0.9,
            },
          },
        },
      },
    };
  };

  static init = (initialStack, layout, bt) => {
    if (this.INITED) {
      this.clearBackHandlerListener();
      this.clearCommandCompletedListener();
      this.clearDidAppearListener();
      this.clearDidDisappearListener();
    }
    Navigation.modalIsOn = false;
    this.initialStack = initialStack;
    this.currentStack = initialStack;
    this.mainLayout = null;
    this.mainStack = initialStack;

    // /listener
    this.registerBackHandlerListener();
    this.registerCommandCompletedListener();
    this.registerDidAppearListener();
    this.registerDidDisappearListener();

    this.mainLayoutRaw = layout;
    this.mainLayout = Navigation.getLayout(layout);
    this.rtl = layout.rtl ? layout.rtl : true;
    Navigation.currentScreen = '';
    if (bt) {
      NativeNavigation.setRoot({
        root: this.mainLayout,
      });
    } else {
      NativeNavigation.setRoot({
        root: {
          stack: {
            id: initialStack,
            children: [this.mainLayout],
          },
        },
      });
    }

    this.INITED = true;
  };

  // if setMainLayout = true, layout must be defined
  static setStackRoot = (layout, stack, setMainLayout) => {
    try {
      if (setMainLayout && !layout) {
        throw new Error('Navigation.setStackRoott() ERROR');
      }
    } catch (error) {
      return;
    }

    // const newLayout = layout
    //   ? Navigation.getLayout(layout)
    //   : Navigation.getLayout(this.mainLayoutRaw);

    const newLayout = layout
      ? Navigation.getLayout(layout)
      : Navigation.getLayout(this.mainLayoutRaw);
    if (setMainLayout) {
      this.mainLayoutRaw = layout;
      this.mainLayout = newLayout;
    }

    NativeNavigation.setStackRoot(stack || this.mainStack, newLayout);
  };

  static getLayout = layout =>
    Navigation.getSideMenuLayout(layout) ||
    Navigation.getBottomTabsLayout(layout) ||
    Navigation.getScreenLayout(layout);

  static setTab = componentId => {
    Navigation.currentTabID = componentId;
  };

  static getTab = () => {
    return Navigation.currentTabID;
  };

  static push = async (layout, bt, go) => {
    if (layout.bottomTabs) {
      await NativeNavigation.push('MAIN_STACK', Navigation.getLayout(layout));
      return;
    }
    const screenName = typeof layout === 'string' ? layout : layout.name;
    const passProps = typeof layout === 'string' ? {} : layout.passProps;
    const stackName = typeof layout === 'object' ? layout.stackName : null;
    console.log('Nvvvvv push ', screenName, bt, go);
    if (!go) {
      if (screenName === Navigation.currentScreen) {
        return;
      }
    }
    Navigation.currentScreen = screenName;

    if (stackName) {
      await NativeNavigation.showModal({
        stack: {
          id: stackName,
          children: [
            {
              component: {
                name: screenName,
                passProps,
                options: {
                  statusBar: {
                    backgroundColor: colors.statusBar,
                    style: 'light',
                  },
                  bottomTabs: {
                    visible: bt ? bt : false,
                  },
                },
              },
            },
          ],
        },
      });
      this.currentStack = stackName;
      Navigation.modalIsOn = true;
    } else {
      const componentId = this.currentComponentId || this.currentStack;
      // Platform.OS === 'ios'
      // ? this.currentComponentId || this.currentStack
      // : this.currentStack;
      await NativeNavigation.push(componentId, {
        component: {
          name: screenName,
          passProps,
          options: {
            statusBar: { backgroundColor: colors.statusBar, style: 'light' },
            bottomTabs: {
              visible: bt ? bt : false,
            },
            sideMenu: !store.getState().lang.rtl
              ? {
                left: {
                  enabled: false,
                  visible: false,
                },
              }
              : {
                right: {
                  enabled: false,
                  visible: false,
                },
              },
          },
        },
      });
    }
  };

  static pop = async () => {
    const componentId = this.currentComponentId || this.currentStack;
    // Platform.OS === 'ios'
    //   ? this.currentComponentId || this.currentStack
    //   : this.currentStack;
    if (
      componentId === 'MyAccount' ||
      componentId === 'Categories' ||
      componentId === 'MyOrders' ||
      componentId === 'Favorite'
    ) {
      NativeNavigation.mergeOptions('bottomTabs', {
        bottomTabs: {
          currentTabIndex: store.getState().lang.rtl ? 4 : 1,
          visible: true,
          drawBehind: true,
        },
      });
      return;
    }
    if (Navigation.modalIsOn && this.currentStack === this.initialStack) {
      NativeNavigation.dismissAllModals();
      return;
    }

    try {
      await NativeNavigation.pop(componentId);
    } catch (error) {
      if (Navigation.modalIsOn) {
        this.currentStack = this.initialStack;
        NativeNavigation.dismissAllModals();
      } else {
        throw error;
      }
    }
  };

  static showModal = layout => {
    const resolvedLayout = Navigation.getLayout(layout);

    NativeNavigation.showModal({
      stack: {
        children: [resolvedLayout],
      },
    });
  };

  static dismissBranchStack = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static dismissAllModal = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static openMenu = () => {
    if (Navigation.menuDirection === 'right') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: true,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        },
      );
    }
  };

  static closeMenu = () => {
    if (Navigation.menuDirection === 'right') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        },
      );
    }
  };

  static enableMenu = async () => {
    if (Navigation.menuDirection === 'left') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              enabled: true,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'right') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              enabled: true,
            },
          },
        },
      );
    }
  };

  static disableMenu = async () => {
    if (Navigation.menuDirection === 'right') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
              enabled: false,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
              enabled: false,
            },
          },
        },
      );
    }
  };


}

export default Navigation;
