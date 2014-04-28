<?php
/*
Template Name: Contact Map Template 
*/
?>


<section class="gmap">
      <style>
       #map-canvas {
        height: 400px;
        width: 100%;
      }
    </style>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script>
var map;
var brooklyn = new google.maps.LatLng(47.590879, 19.341614);

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

  var featureOpts = [
    {
      stylers: [
        { hue: '#F29A19' },
        { visibility: 'simplified' },
        { gamma: 0.5 },
        { weight: 0.5 }
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        { color: '#F29A19' }
      ]
    }
  ];

  var mapOptions = {
    zoom: 16,
    center: brooklyn,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
   var marker = new google.maps.Marker({
      position: brooklyn,
      map: map,
      title: 'Mobilia Shops & Homes'
  });

}


google.maps.event.addDomListener(window, 'load', initialize);
</script>
<div id="map-canvas"></div>

</section>

