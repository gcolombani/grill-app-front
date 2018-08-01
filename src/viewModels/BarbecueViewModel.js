import { observable, action } from 'mobx'
import { Barbecue } from 'models'
import axios from 'axios';
import { NavigationStorage } from 'config/NavigationStorage';

const GLOBAL = require('config/GLOBAL');


class BarbecueViewModel{
    @observable barbecues = [];
    @observable myBarbecues = [];
    @observable barbecues_selected = [];
    @observable barbecue = {};
    @observable static instance = null;

    constructor(){
        this.load();
    }

    @action
    static getInstance() {
      if (!this.instance) {
        this.instance = new BarbecueViewModel();
      }
      return this.instance;
    }

    @action
    add(barbecue){
      axios.post(`${GLOBAL.base_url}barbecues`, {
        model: barbecue.model,
        description: barbecue.description,
      }).then( data => {
          NavigationStorage.go(GLOBAL.pages.myList);
      }).catch(error =>  {});
    }

    @action
    setBarbecue(barbecue) {
      this.barbecue = Barbecue.deserialize(barbecue);
    }

    @action
    getBarbecue() {
      return this.barbecue;
    }

    @action
    select(id){
      const currentIndex = this.barbecues_selected.indexOf(id);

      if (currentIndex === -1) {
        this.barbecues_selected.push(id);
      } else {
        this.barbecues_selected.splice(currentIndex, 1);
      }
      return true;
    }

    @action
    remove(Barbecue: Barbecue){
        const index = this.barbecues.indexOf(Barbecue)
        if(index > -1){
            this.barbecues.splice(index, 1)
        }
    }

    @action
    load(myList){
        axios.get(`${GLOBAL.base_url}${myList ? 'my_barbecues' : 'barbecues'}`).then( data => {
            const json = data.data;
            if (myList) {
              this.myBarbecues = json.map(b => Barbecue.deserialize(b));
            } else {
              this.barbecues = json.map(b => Barbecue.deserialize(b));
            }
        }).catch(error =>  {});
        this.barbecue = new Barbecue();
    }

    @action
    save(){
        if(this.barbecues.filter(Barbecue => Barbecue.isValid === false).length > 0){
            alert("Unable to save: There are invalid Barbecues.")
        }

        if(window.localStorage){
            window.localStorage.setItem(
                "Barbecues",
                JSON.stringify(
                    this.barbecues.map(Barbecue => Barbecue.serialize())
                )
            )
        }
    }
    @action
    handleChange(key) {
      return value => {
        this.barbecue[key] = value.target.value;
      };
    }
}
export {
  BarbecueViewModel
};
