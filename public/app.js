var app = new Vue({
    el: "#app",
    data: {
        stations: {},
        favs: {300: "Gym", 226: "Home", 117: "CTA L"},
        favRoutes: [
            {start: 226, end: 117}, 
            {start: 226, end: 300},
            {start: 300, end: 117},
            {start: 300, end: 226},
            {start: 117, end: 300},
            {start: 117, end: 226}
        ],
        routes: []
    },
    methods: {
        available: function(num) {
            return "h1 " + (num > 0 ? "text-success" : "text-danger");
        },
        isFavorite: function(station) {
            return Object.keys(this.favs).indexOf(station.id.toString()) > -1;
        },
        addName: function(station) {
            station.name = this.favs[station.id.toString()];
            return station;
        },
        genRoutes: function() {
            this.routes = this.favRoutes.map(r => this.genRoute(r))
            // console.log(this.routes);
        },
        genRoute: function(route) {
            let start = this.stations[route.start];
            let end = this.stations[route.end];
            return {
                start: start,
                end: end,
                status: this.calcStatus(start, end)
            };
        },
        calcStatus: function(start, end) {
            if (start.availableBikes == 0 || end.availableDocks == 0) {
                return "panel-danger";
            } else if (start.availableBikes > 2 && end.availableDocks > 2) {
                return "panel-success";
            } else {
                return "panel-warning";
            }
        }
    },
    created: function() {
        this.$http.get("https://crossorigin.me/https://feeds.divvybikes.com/stations/stations.json").then(response => {
            this.stations = {}; //TODO why is this needed? 
            for (const station of response.data.stationBeanList) {
                if (this.isFavorite(station)) {
                    const id = station.id.toString()
                    station.name = this.favs[id];
                    this.stations[id] = station;
                }
            }
            this.genRoutes();
        }, response => {
            this.stations = {}
            console.log("Error: " + response)
        });
    }
})
