/* Magic Mirror
 * Node Helper: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.
    start: function() {
        this.extraRoutes();
    },
	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
	},

	// Example function send notification test
	sendNotificationTest: function(payload) {
	},

	// this you can create extra routes for your module
	extraRoutes: function() {
		var self = this;
		this.expressApp.get("/MMM-gameresult/registerresult", function(req, res) {
			var fs = require('fs');
            var contents = fs.readFileSync('modules/MMM-gameresult/registerresult.html');
            res.contentType( "text/html" );
			res.send( contents );
		});
	},

	// Test another function
	anotherFunction: function() {
		return {date: new Date()};
	}
});