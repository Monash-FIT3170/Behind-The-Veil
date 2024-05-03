import { Meteor } from 'meteor/meteor';
import "../imports/api/methods/booking";

import "/imports/api/collections/services.js";
import "/imports/api/methods/services.js";
import "/imports/api/publications/services.js";

// Leave for now for any methods that need to be called on start up.
Meteor.startup(async () => {

});
