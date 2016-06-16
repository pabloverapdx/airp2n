import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  owner: DS.attr(),
  city: DS.belongsTo('city', { async: true}),
  type: DS.attr(),
  image: DS.attr(),
  bedrooms: DS.attr()
});
