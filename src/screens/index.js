import { Navigation } from '../ui';

import SideMenu from '../components/SideMenu';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Resetpassword from './Resetpassword/Resetpassword';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import ForgotPasswordwithcode from './ForgotPasswordwithcode/ForgotPasswordwithcode';
import Home from './Home/Home';
import Intro from './Intro/Intro';
import Search from './Search/Search';
import AddRent from './AddRent/AddRent';
import AddSell from './AddSell/AddSell';  
import SearchResult from './SearchResult/SearchResult';
import PostDetails from './PostDetails/PostDetails';
import Catogries from './Catogries/Catogries'; 
import Catogries1 from './Catogries1/Catogries1'; 
import CatogriesItem from './CatogriesItem/CatogriesItem'; 

import Favourite from './Favourite/Favourite'; 
import MyAds from './MyAds/MyAds'; 
import ContactUs from './ContactUs/ContactUs';
import AboutUs from './AboutUs/AboutUs';
import AboutUs1 from './AboutUs1/AboutUs1';
import ItemRealState from './ItemRealState/ItemRealState';
import TermsAndCondition from './TermsAndCondition/TermsAndCondition';





export default function () {
  Navigation.registerScreen('Login', Login);
  Navigation.registerScreen('SignUp', SignUp);
  Navigation.registerScreen('Resetpassword', Resetpassword);
  Navigation.registerScreen('ForgetPassword', ForgetPassword);
  Navigation.registerScreen('ForgotPasswordwithcode', ForgotPasswordwithcode);
  Navigation.registerScreen('SideMenu', SideMenu);
  Navigation.registerScreen('Home', Home);
  Navigation.registerScreen('Intro', Intro);
  Navigation.registerScreen('Search', Search);
  Navigation.registerScreen('AddRent', AddRent);
  Navigation.registerScreen('AddSell', AddSell);  
  Navigation.registerScreen('SearchResult', SearchResult); 
  Navigation.registerScreen('PostDetails', PostDetails); 
  Navigation.registerScreen('Catogries', Catogries); 
  Navigation.registerScreen('CatogriesItem', CatogriesItem); 
  Navigation.registerScreen('Catogries1', Catogries1); 
  Navigation.registerScreen('Favourite', Favourite); 
  Navigation.registerScreen('MyAds', MyAds);   
  Navigation.registerScreen('ContactUs', ContactUs); 
  Navigation.registerScreen('AboutUs', AboutUs); 
  Navigation.registerScreen('AboutUs1', AboutUs1); 
  Navigation.registerScreen('ItemRealState', ItemRealState); 
  Navigation.registerScreen('TermsAndCondition', TermsAndCondition); 
  

}
