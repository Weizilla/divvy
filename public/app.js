var app = new Vue({
    el: "#app",
    data: {
        stations: [],
        favs: {300: "Gym", 226: "Home", 117: "CTA L"},
        favRoutes: [(226, 117), (226, 300), (300, 117), (300, 226), (117, 300), (117, 226)],
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
        }
    },
    created: function() {
        this.$http.get("https://crossorigin.me/https://feeds.divvybikes.com/stations/stations.json").then(response => {
            this.stations = response.data.stationBeanList
                .filter(station => this.isFavorite(station))
                .map(station => this.addName(station))
                .sort((a, b) => a.stationName.localeCompare(b.stationName));
        }, response => {
            this.stations = []
            console.log("Error: " + response)
        });
    }
})
