import {
  observable, computed
} from 'mobx';


class Barbecue {
  id = 0;
  @observable model = '';

  @observable description = '';

  @observable owner = null;

  @computed get isValid() {
    return this.model !== '';
  }
  serialize(){
    return {
        id: this.id,
        model: this.model,
        description: this.description,
        owner: this.owner
    };
  }
  static deserialize(json: Object){
    const b = new Barbecue();
    b.id = json['id'] || 0;
    b.model = json['model'] || '';
    b.description = json['description'] || '';
    b.owner = json['owner'] || '';
    return b;
  }
}

export { Barbecue };
