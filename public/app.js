var app = new Vue({
    el: "#app",
    data: {
        stations: {},
        favs: {
            300: { name: "Gym", imageName: "fitness_center" },
            226: { name: "Home", imageName: "home" },
            117: { name: "CTA L", imageName: "directions_subway" },
        },
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
        isFavorite: function(station) {
            return Object.keys(this.favs).indexOf(station.id.toString()) > -1;
        },
        genRoutes: function() {
            this.routes = this.favRoutes.map(route => {
                let start = this.stations[route.start];
                let end = this.stations[route.end];
                return {
                    start: start,
                    end: end,
                    status: this.calcRouteStatus(start, end)
                };
            });
        },
        calcRouteStatus: function(start, end) {
            if (start.availableBikes == 0 || end.availableDocks == 0) {
                return "danger";
            } else if (start.availableBikes > 2 && end.availableDocks > 2) {
                return "success";
            } else {
                return "warning";
            }
        },
        calcStationStatus: function(num) {
            if (num == 0) {
                return "danger";
            } else if (num > 2) {
                return "muted";
            } else {
                return "warning";
            }
        },
    },
    created: function() {
        this.$http.get("https://crossorigin.me/https://feeds.divvybikes.com/stations/stations.json").then(response => {
            this.stations = {}; //TODO why is this needed? 
            for (const station of response.data.stationBeanList) {
                if (this.isFavorite(station)) {
                    const id = station.id.toString()
                    station.name = this.favs[id].name;
                    station.imageName = this.favs[id].imageName;
                    station.bikeStatus = this.calcStationStatus(station.availableBikes);
                    station.dockStatus = this.calcStationStatus(station.availableDocks);
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
