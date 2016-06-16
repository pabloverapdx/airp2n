import Ember from 'ember';

export default Ember.Component.extend({
  addNewRental: false,
  actions: {
    rentalFormShow() {
      this.set('addNewRental', true);
    },
    save1() {
      var params = {
        owner: this.get('owner'),
        city: this.get('city'),
        type: this.get('type'),
        image: this.get('image'),
        bedrooms: this.get('bedrooms'),
      };
      this.set('addNewRental', false);
      this.set('owner', "");
      this.set('city',"");
      this.set('type', "");
      this.set('image', "");
      this.set('bedrooms', "");
      this.sendAction('save2', params);
    }
  }
});
