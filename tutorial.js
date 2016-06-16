1. ember new project-name

2. ember install ember-bootstrap

3. ember install emberfire

4. ember install liquid-fire (optional) for styling.

5. Create database on firebase to store model data:
  * get key and put in config/ environment

6. Create route handler and template for 'about' page in terminal: //Make a 'contact' page too if you like. refer to BB
  * ember g route pageName
    * will generate 'routes/about.js'
    * will generate 'templates/about.hbs'

7. Create route handler index.js and page index.hbs:
  * ember g route index
    * this will look like 'routes/index.js' and 'templates/index.hbs'

8. Add model hook to routes/index.js route handler: //refer to CC
  * model (){

  }

9. Generate Ember Data model in terminal: //refer to DD and FF
  * ember g model modelName (example: 'rental')
    * this will look like 'app/models/rental.js'

10. Change Import/Export from 'models/rental.js' and add ATTRIBUTES //refer to GG
  * import DS from 'ember-data';
  * export default DS.Model.extend({
    owner: DS.attr(),
    city: DS.attr()
  });

11. Create JSON file to import in Firebase: //refer to HH
  * this will look like Airp2n/rentals.json //use PLURALIZATION
    * Look at JSON format

12. Go to Firebase and import rentals.JSON file

13. Update model hook in routes/index.js route handler:
    * model() {
      return this.store.findAll('rental') //refer to II
    }
14. Add a COMPONENT (rental-tile) rental-tile.hbs and rental-tile.js: //refer to JJ
    * ember g component rental-tile
      * this will look like 'app/components/rental-tile.js'
      * this will look like 'app/templates/components/rental-tile.hbs'

15. Add {{#each}} helper to index.hbs in order to display rental-tile.hbs: //refer to HELPERS
    * {{#each model as |rental|}}
        {{rental-tile rental=rental}} //left rental needs to match with all located in rental-tile.js and hbs
      {{/each}}                                                  //right rental needs to match |rental|

16. Add code to rental-tile.hbs template to display owner, type, and city.
<li>
    {{rental.owner}}
    {{rental.type}}
    {{rental.city}}
    // 17. Add action helper to display show/hide image:
    //     * add if statement
          * {{#if imageShowing}}
              <p><img src={{rental.image}} alt={{rental.type}} {{action 'hideImage'}}></p>
            {{else}}
              <button {{action 'showImage'}}>Show image</button>
</li>

18. Add action helper to show/hide image to rental-tile.js
    * imageShowing: false,
      actions: {
        showImage: function(){
          this.set('imageShowing', true);
        },
        imageHide: function(){
          this.set('imageShowing', false)
        }
      }
================================================================================
                          ADD DESTROY ACTION
================================================================================
19. Create delete button to rental-tile.hbs component
    * <li>
          ...
          <button {{ action 'delete' rental}}> DELETE </button>
      </li>

    20. Pass 'delete' action to rental-tile.js component
        * },
           delete(anyParameter){
             if (confirm('Are you sure you want to delete?')){
               this.sendAction('destroyRental', anyParameter);
             }
           }
           21. Pass 'destroyRental' up to route handler index.js:
                * actions: {
                  destroyRental(anything){
                    anythingdestroyRecord();
                    this.transitionTo('index');
                  }
                }
                22. transitionTo 'index' template:
                {{rental-tile rental = rental destroyRental='destroyRental'}} //left destroy needs to match rental-tile.js
                                                                                                         //right destroyRental needs to match index.js

================================================================================
                                ADD NEW RENTAL
================================================================================
23. Add new-rental.js and new-rental.hbs components in terminal:
    * ember g component new-rental
      * This will look like 'app/components/new-rental.js'
      * This will look like 'app/templates/components/new-rental.hbs'

24. Add new-rental component code to index.hbs template:
    * {{new-rental save2="save3"}}

25. Toggle a 'New Rental' button and form in new-rental.hbs template:
    *{{# if addNewRental}}
        Form goes here. //refer to KK
      {{else}}
      <button {{action 'rentalFormShow'}}>New Rental</button>

      26. Add behavior for 'rentalFormShow' button in new-rental.js route to show/hide rental form:
          * addNewRental: false,
              actions: {
                rentalFormShow(){
                  this.set('addNewRental', true)
                }
              }

27. Add Save action to new-rental.js component:
    },
    save1(){
      var anyParams = {
        owner: this.get('owner'),
        city: this.get('city'),
      };
      this.set('addNewRental', false);
      this.sendAction('save2', anyParams)
    }

28. Add save action to index.js route:
    * save3(saveAnyParamWhatever){
      var newRental = this.store.createRecord('rental', saveAnyParamWhatever);
      newRental.save();
      this.transitionTo('index')
    }

================================================================================
                                UPDATE RENTAL
================================================================================
29. Add a COMPONENT (update-rental):
    * This will look like 'component/update-rental.js'
    * This will look like 'templates/components/update-rental.hbs'

30. Add update-rental display code into child component (rental-tile.hbs) template:
    *<li>
      // {{#if}}...{{/if}}
      {{update-rental rental=rental update="updateToTemplate"}}
      ...
      // <button {{action 'delete' rental}}Delete</button>
    </li>

31. Add form inside update-rental.hbs template: //refer to
    {{#if updateRentalForm}}
      Form goes here
      {{else}}
        <button {{action 'updateRentalForm'}}>Update</button>

        32. Add update action to update-rental.js component:
            * updateRentalForm: false,
            actions: {
              updateRentalForm(){
                this.set('updateRentalForm', true);
              },
              update(anyCrappyParam){
                var againAnyParams = {
                  owner: this.get('owner'),
                  city: this.get('city'),
                };
                this.set('updateRentalForm', false);
                this.sendAction('updateInComponent', anyCrappyParam, againAnyParams)
              }
            }

            33. Add action update to rental-tile.js component
              //  *imageShowing: false,
                updateRentalForm: false,
                actions: {
                  // showImage()
                  // ...
                }, update(anyThingHere, anyParamsHere){
                  this.sendAction('updateToTemplate', anyThingHere, anyParamsHere);
                },
                //  delete()
                // }
              34. Add updateToTemplate in index.hbs to display update form:
                  {{rental-tile rental=rental updateToTemplate="finalUpdate"}}

                  35. Add update action to index.js route handler:
                      * },
                        finalUpdate(anyRental, moreParams){
                          Object.keys(moreParams).forEach(function(key){
                            if(moreParams[key] !==undefined){
                              anyRental.set(key, moreParams[key]);
                            }
                          });
                          anyRental.save();
                          this.transitionTo('index');
                        }




================================================================================
                  DYNAMIC ROUTING - displays detail for a single rental object
================================================================================
37. Generate 'rental' route handler and template in terminal:
    * ember g route rental
      * This will look like routes/rental.js
      * This will look like templates/rental.hbs

38. Add dynamic segment to 'app/router.js': //represent id of a given rental in Firebase
      * this.route('rental', {path: '/rental/:rental_id'}); //When id matches with one in a link from our app, it will map URL to 'rental.js' route handler, and
                                                            //sends a params hash that includes the value of the :rental_id segment to the URL.

39. Locate records in rental.js route handler:
    model(params){
      return this.store.findRecord('rental', params.rental_id); refer to
    },

40. rental.js route will render rental.hbs template.
      Enter code in rental.hbs template:
        * <h2>More information about {{model.owner}} {{model.type}}</h2>

41. GENERATE rental-detail component to display details about this model:
        * ember g component rental-detail
          * This will look like 'app/components/rental-detail.js'
          * This will look like 'templates/components/rental-detail.hbs'

42. Render this component on rental.hbs template. Define components 'rental' as the current model:
      * <h2>...</h2>
        {{rental-detail rental=model}}

REFACTOR NEXT









=============================================================
=============================================================
                          HELPERS
=============================================================
* {{#link-to 'pageName'}} Click Me to enter pageName{{/link-to}}


* {{#each model as |value|}}
    {{component variable = value}} //in order to access model
  {{/each}}
    * loops through each object in our model and display info
    * 'variable' refers to variable name used within the child components (js and hbs)
    * 'value' refers to model object we are assigning 'variable' to



=============================================================
                          NOTES
=============================================================
AA. Router:
      * router.js loads routes/pageName.js loads template/pageName.hbs


BB. Route Handler:
      * route handler RESPONSIBLE for loading model data
      * ONLY route handler can ACCESS model data

CC.  Hook:
      * a method within Ember class

DD.  Ember Data:
      * model data management library

FF.  Model file:
      * 'blueprint' listing out attributes

GG.  ATTRIBUTES:
      * DS = Data store
      * owner: DS.attr(); ---> stored in database --> firebase

HH. JSON format:
      { "rentals": [{
          "owner": "Niem",
          "city": "Vancouver"
        }, {
          "owner": "Pablo",
          "city": "Vancouver"
        }]
      }

II. findAll method with argument 'rental':
      * find all records of type 'rental' in the store and return to application.

JJ. COMPONENT:
    * has 2 parts that work side by side
      * Handlebars template that defines display (hbs)
      * JavaScript source file that defines how it will behave (js)
    * cannot access model

KK. new-rental form format:
  <h1>New Rental</h1>
    <div>
      <form>
        <div class='form-group'>
        <lable for="owner">Owner</label>
        {{input value=owner id="owner"}}
        </div>
        <button {{action 'save1'}}>Save</button>
      </form>
    </div>

LL. update-rental form format:
<h4>Update {{rental.owner}}{{rental.type}}</h4>
  <div>
    <form>
      <div class='form-group'>
      <lable for="owner">Owner</label>
      {{input value=owner id="owner" placeholder=rental-in-incomponent.type}}
      </div>
      <button {{action 'updateInComponent' rental}}>Save</button>
    </form>
  </div>

MM. dynamic segment:
      * placeholder that may be dynamically updated depending on circumstances(ie. which link we click to travel to this route)

NN. findRecord:
    * takes 2 arguments:
        * type of object('rental')
        * objects specific id (params.rental_id)
