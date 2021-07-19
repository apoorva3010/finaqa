
jQuery(document).ready(function () {
    "use strict";
    //google map

           function initialize() {
            var map;
            var panorama;
            var var_latitude = 18.549351
            var var_longitude = 73.7871573;
            var pin = 'img/placeholder.png';
            var title = "FinaQA  Money Maker";
            var rentPro_name = "FinaQA Money Maker";
            var rentPro_address = "#868, 17- G Main, 5th Block,";
            var rentPro_desc = "xyz road";
            var rentPro_more_desc = " Us,";
            var rentPro_more_desc1 = "123 456";


            var rentPro_location = new google.maps.LatLng(var_latitude, var_longitude);
            var mapOptions = {
                center: rentPro_location,
                zoom: 12,
                scrollwheel: false,
                streetViewControl: false
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var contentString = '<div id="infowindow_content">' + '<p><strong>' + rentPro_name + '</strong><br>' + rentPro_address + '<br>' + rentPro_desc + '<br>' + rentPro_more_desc + '<br>' + rentPro_more_desc1 + '</p>' + '</div>';
            var var_infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                position: rentPro_location,
                map: map,
                icon: pin,
                title: title,
                maxWidth: 500,
                optimized: false,
            });
            google.maps.event.addListener(marker, 'click', function() {
                var_infowindow.open(map, marker);
            });
            panorama = map.getStreetView();
            panorama.setPosition(rentPro_location);
            panorama.setPov(({
                heading: 265,
                pitch: 0
            }));
            var openStreet = document.getElementById('openStreetView');
            if (openStreet) {
                document.getElementById("openStreetView").onclick = function() {
                    toggleStreetView()
                };
            }

            function toggleStreetView() {
                var toggle = panorama.getVisible();
                if (toggle == false) {
                    panorama.setVisible(true);
                } else {
                    panorama.setVisible(false);
                }
            }
        }

        google.maps.event.addDomListener(window, 'load', initialize);


}); //