var app = new Vue({
    el: "#app",
    data: {
        stations: [],
        favIds: [300, 226, 117]
    },
    methods: {
        available: function(num) {
            return "h1 " + (num > 0 ? "text-success" : "text-danger");
        }
    },
    created: function() {
        this.$http.get("https://crossorigin.me/https://feeds.divvybikes.com/stations/stations.json").then(response => {
            this.stations = response.data.stationBeanList
                .filter((station) => this.favIds.indexOf(station.id) > -1)
                .sort((a, b) => a.stationName.localeCompare(b.stationName))
            console.log(JSON.stringify(this.stations))
        }, response => {
            this.stations = []
            console.log("Error: " + response)
        });
    }
})
