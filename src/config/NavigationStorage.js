import { observable, action } from 'mobx';

class NavigationStorage{
    @observable static current_page = 0;

    constructor(){
        this.load()
    }

    @action
    static go(page){
        this.current_page = page;
        if(window.localStorage){
          window.localStorage.setItem(
              "page",
              page.toString()
          );
        }
        return true;
    }
    @action
    load(){
      if(window.localStorage){
        const page = parseInt(window.localStorage.getItem("page") || "0", 10);
        NavigationStorage.current_page = page;
      }
    }

}
export {
  NavigationStorage
};
