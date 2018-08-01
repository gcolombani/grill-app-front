import { observable, action } from 'mobx'
import { User } from 'models'
import axios from 'axios';
import { NavigationStorage } from 'config/NavigationStorage';
const GLOBAL = require('config/GLOBAL');


class UserViewModel{

    @observable static currentUser = null;
    @observable static openLoginDialog = false;
    @observable user_credentials = {};
    @observable registerError = '';
    @observable registerMode = false;
    @observable static instance = null;

    constructor(){
        this.load();
    }

    @action
    static getInstance() {
      if (!this.instance) {
        this.instance = new UserViewModel();
      }
      return this.instance;
    }
    @action
    load(){
      if(window.localStorage){
        const currentUser = JSON.parse(window.localStorage.getItem("currentUser") || 'null');
        const customHeaders = JSON.parse(window.localStorage.getItem("customHeaders") || 'null');
        UserViewModel.currentUser = currentUser;
        axios.defaults.headers.common = {
          ...axios.defaults.headers.common,
          ...customHeaders
        };
      }
    }
    @action
    saveUser(data, headers) {
      UserViewModel.currentUser = User.deserialize(data.data);
      const customHeaders = {
        'access-token': headers['access-token'],
        uid: data.data.uid,
        client: headers.client
      };
      axios.defaults.headers.common = {
        ...axios.defaults.headers.common,
        ...customHeaders
      };
      UserViewModel.openLoginDialog = false;
      if(window.localStorage){
          window.localStorage.setItem(
              "customHeaders",
              JSON.stringify(
                  customHeaders
              )
          );
          window.localStorage.setItem(
              "currentUser",
              JSON.stringify(
                  data.data
              )
          );
      }
    }

    @action
    login(){
        axios.post(`${GLOBAL.base_url}auth/sign_in`,
          this.user_credentials
        ).then(({ data, headers }) => {
          this.saveUser(data, headers);
        }).catch(error =>  {});
    }
    @action
    logout(){
      const onComplete = data => {
        axios.defaults.headers.common = {
          ...axios.defaults.headers.common,
          ...{
            'access-token': undefined,
            uid: undefined,
            client: undefined
          }
        };
        UserViewModel.currentUser = null;
        if(window.localStorage){
          window.localStorage.setItem(
            "customHeaders",
            null
          );
          window.localStorage.setItem(
            "currentUser",
            null
          );
        }
        NavigationStorage.go(GLOBAL.pages.list);
      };
      axios.delete(`${GLOBAL.base_url}auth/sign_out`
      ).then(onComplete).catch(onComplete);
    }
    @action
    register(){
      if (this.user_credentials.zip_code) {
        axios.post(`${GLOBAL.base_url}/auth`,
          this.user_credentials
        ).then(({ data, headers }) => {
          this.saveUser(data, headers);
        }).catch(error =>  {
          this.registerError = error.message;
        });
      } else {
        this.registerMode = true;
      }
    }
    @action
    onCloseLoginDialog() {

    }
    @action
    handleChangeCredentials(key) {
      return value => {
        this.user_credentials[key] = value.target.value;
      };
    }
    @action
    static toggleLoginDialog() {
      this.openLoginDialog = !this.openLoginDialog;
    }

}
export {
  UserViewModel
};
