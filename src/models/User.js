import {
  observable, computed
} from 'mobx';

class User {
  @observable id = 0;

  @observable name = '';

  @observable zipcode = '';

  @observable email = '';

  @computed get isValid() {
    return this.email !== '';
  }
  serialize(){
    return {
        id: this.id,
        name: this.name,
        email: this.email,
        zipcode: this.zipcode
    };
  }
  static deserialize(json: Object){
    const b = new User();
    b.id = json['id'] || 0;
    b.name = json['name'] || '';
    b.email = json['email'] || '';
    b.zipcode = json['zipcode'] || '';
    return b;
  }
}

export { User };
