var app = new Vue({
    el: "#app",
    data: {
        message: "Hello vue!"
    },
    created: function() {
        this.$http.get("https://crossorigin.me/https://feeds.divvybikes.com/stations/stations.json").then(response => {
            console.log(response.data)
        }, response => {
            console.log("Error: " + response)
        });
    }
})
