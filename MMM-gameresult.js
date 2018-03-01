/* global Module */

/* Magic Mirror
 * Module: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */

Module.register("MMM-gameresult", {
	defaults: {
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
        var self = this;
        this.gamesLoaded = false;
        var self = this;
        this.getGames();
   	}, 

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 * Y:255, 206, 84 - ffe154
     * R:246,66,116 - f64274
     * P:237, 84,255 - ed54ff
	 */
	getGames: function() {
        this.sendSocketNotification("MMM-gameresult-GET_GAMES", "");
	},

    /*
     *  get an icon that represents Player
     */ 
    getIcon : function(shortName) {
        for (var p in this.games.players) {
            var player = this.games.players[p];
            if (player.shortName == shortName) {
                return 'background-image: url("/modules/MMM-gameresult/img/' + player.icon + '"); background-size:contain; background-repeat:no-repeat;';
            }
        }
        console.log("NO");
        return "";
    },

    //
    //  Creation of the resulting table. 
    //  Handles last game and totals
    //
    createGameTable : function(game) {
        //
        //  Setup wrappers
        //
        var gamewrapper = document.createElement("div");
        gamewrapper.className = "resultdivider";
        var table = document.createElement("table");
        gamewrapper.appendChild(table);
        table.className = "small align-left";

        // Game name and date
        var row = document.createElement("tr"); 
        table.appendChild(row);
        row.className = "thin";
        row.innerHTML = "<td colspan='3'>" + game.gamename + "</td>" + 
                        "<td class='align-right'>" + game.playeddate + "</td><td></td>";
        
        // Game result table
        var table = document.createElement("table");
        gamewrapper.appendChild(table);
        table.className = "small align-left";
                        
        // Result header
        var row = document.createElement("tr"); table.appendChild(row);
        var cell = document.createElement("td"); cell.innerHTML = "#"; cell.className = "resultheader align-left";  row.appendChild(cell);
        cell = document.createElement("td"); cell.innerHTML  = "Spelare"; cell.className = "resultheader align-left"; row.appendChild(cell);
        cell = document.createElement("td"); cell.innerHTML  = "Vinster"; cell.className = "resultheader align-right"; row.appendChild(cell);
        cell = document.createElement("td"); cell.innerHTML = "Poäng"; cell.className = "resultheader align-right"; row.appendChild(cell);
        
        // Table content
        var idx = 1;
        for(var p in game.playerresults) {
            var player = game.playerresults[p];
            var row = document.createElement("tr"); table.appendChild(row);
            var cell = document.createElement("td");  row.appendChild(cell);
            cell.innerHTML = idx++; cell.className = "";

            cell = document.createElement("td");  row.appendChild(cell);
            cell.innerHTML  = "&nbsp"; cell.style = this.getIcon(player.name);
            console.log(cell.style);

            cell = document.createElement("td"); row.appendChild(cell);
            cell.innerHTML  = player.wins; cell.className = "align-right"; 

            cell = document.createElement("td");  row.appendChild(cell);
            cell.innerHTML = player.result; cell.className = "align-right";

        }
        return gamewrapper;
    },

    //
    //  The DOM-getter
    //
	getDom: function() {
        var self = this;

		// create element wrapper for show into the module
        var wrapper = document.createElement("div");
        wrapper.className = ""
 
        if (!this.gamesLoaded) {
            // Haven't loaded yet - tell the user that we're working on it
            wrapper.innerHTML = "Loading...";
            wrapper.className = "dimmed light small ";

        }
        else {
            console.log(this.games);
            // Header 
            var tableWrapper = document.createElement("table");
            tableWrapper.className = "small align-left";
           
            // Create last game
            if (this.games.lastgame) {
               // console.log(this.games.lastgame);
                var game = this.games['lastgame'];

                var lastGameWrapper = document.createElement("div");
                lastGameWrapper.className = "align-left resultgame";
                lastGameWrapper.innerHTML = "<i>Senaste spel</i>";
                wrapper.appendChild(lastGameWrapper);

                lastGameWrapper.appendChild(this.createGameTable(game));
            }

            // Create Total games
            var totalGameWrapper = document.createElement("div");
            totalGameWrapper.className = "align-left resultgame";
            totalGameWrapper.innerHTML = "<i>Totalt</i>";
            wrapper.appendChild(totalGameWrapper);

            for(var g in this.games.gameStandings) {
                var game = this.games.gameStandings[g];
                totalGameWrapper.appendChild(this.createGameTable(game));

            }
            wrapper.appendChild(tableWrapper);
        }
        return wrapper;
	},

	getStyles: function () {
		return [
			"MMM-gameresult.css",
		];
    },
    
    socketNotificationReceived: function (notification, payload) {
        //console.log("Working notification system. Notification:", notification, "payload: ", payload); 
        if (notification === "MMM-gameresult-GAMES") {
            this.games = payload;
            this.gamesLoaded = true;
            this.updateDom();
        }
    }

});