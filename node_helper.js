/* Magic Mirror
 * Node Helper: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

var NodeHelper = require("node_helper");
var fs = require("fs");
var path = require('path');

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
		if(notification === "MMM-gameresult-GET_GAMES") {
			console.log("GETTING GAMES");
			var result = fs.readFileSync(path.join(__dirname, 'games.txt'), "utf-8");
			console.log(result);
			this.sendSocketNotification("MMM-gameresult-GAMES", JSON.parse(result));
		}
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