var map;
var app = new Vue({
    el: '#app',
    data: {
        loader: true,
        point: {
            "label": "México",
            "info": "Estados, Municipios y Localidades De Mexico.<br>(<strong>304,221</strong> localidades)<br> Repositorio: <br><a href='https://github.com/eduardoarandah/coordenadas-estados-municipios-localidades-de-mexico-json'>https://github.com/eduardoarandah/coordenadas-estados-municipios-localidades-de-mexico-json</a>",
            "lat": 0,
            "lng": 0,
            "children": "/data/mexico.json",
            "parent": null
        },
        selectedPoint: null,
        markers: [],
        points: [],
        filter: null,
        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.
        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        customMarker: {
            url: '/img/marker.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(150, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 25).
            anchor: new google.maps.Point(0, 32)
        }
    },
    created: function() {
        this.loader = false;
        this.loadPointsFileRefreshMap();
    },
    methods: {
        //show info about this point
        selectPoint: function(point) {
            this.selectedPoint = point;
        },
        //double click depends on if the label has children or not
        doubleClickedInLabel: function(point){
            if(point.children)
              this.loadPoint(point);
            else
              this.selectPoint(point);
        },
        //loads the previous point
        loadParent: function() {
            this.point = this.point.parent;
            this.selectedPoint = null;
            this.loadPointsFileRefreshMap();
        },
        //load children point
        loadPoint: function(point) {
            point.parent = this.point;
            this.point = point;
            this.selectedPoint = null;
            this.loadPointsFileRefreshMap();
        },
        //loads the point
        loadPointsFileRefreshMap: function() {
            if (this.point.children) {
                self = this;
                axios.get(this.point.children).then(function(response) {
                    self.points = response.data;
                    self.loadPointsInMap();
                }).catch(function(error) {
                    console.log(error);
                });
            }
        },
        loadPointsInMap: function() {
            map = new google.maps.Map(document.getElementById('map'));
            this.setMarkers(map, self.points);
            this.centerZoom(map, self.points);
        },
        boundingSquare: function(points) {
            var square = {
                latMin: 0,
                latMax: 0,
                lngMin: 0,
                lngMax: 0,
            };
            for (var i = 0; i < points.length; i++) {
                if (square.latMin == 0 || points[i].lat < square.latMin) square.latMin = points[i].lat;
                if (square.latMax == 0 || points[i].lat > square.latMax) square.latMax = points[i].lat;
                if (square.lngMin == 0 || points[i].lng < square.lngMin) square.lngMin = points[i].lng;
                if (square.lngMax == 0 || points[i].lng > square.lngMax) square.lngMax = points[i].lng;
            }
            return square;
        },
        setMarkers: function(map, points) {
          var self=this;
            for (var i = 0; i < points.length; i++) {
                const point = points[i];
                setTimeout(function() {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: point.lat,
                            lng: point.lng
                        },
                        map: map,
                        icon: self.customMarker,
                        animation: google.maps.Animation.DROP,
                        title: point.label,
                        label: point.label,
                        // point: point
                    });
                    //listener for clicking in the marker
                    marker.addListener('click', function() {
                        app.selectPoint(point);
                    });
                    marker.addListener('dblclick', function() {
                        app.doubleClickedInLabel(point);
                    });
                    // app.markers.push(marker);
                }, i * 10);
            }
        },
        centerZoom: function(map, points) {
            const square = this.boundingSquare(points);
            //auto-center auto-zoom
            bounds = new google.maps.LatLngBounds();
            bounds.extend(new google.maps.LatLng(square.latMin, square.lngMin));
            bounds.extend(new google.maps.LatLng(square.latMax, square.lngMax));
            map.fitBounds(bounds); // auto-zoom
            map.panToBounds(bounds); // auto-center
        }
    }
})