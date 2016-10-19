/* Part 1:
	Set up the map in genreal
	including init map, get my location, rendermap on web
*/
var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var mapOptions = {
	center: me,
	zoom: 15
};
var map;
var marker_me;
var infowindow = new google.maps.InfoWindow();

//initiate google map 
function init(){
	map = new google.maps.Map(document.getElementById('map_onscreen'),mapOptions);
	console.log(map);
	getMyLocation();
	set_Marker();
}

//get location for map
function getMyLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

//center the map to current position and set up marker info window
function renderMap(){
	me = new google.maps.LatLng(myLat, myLng);

	map.panTo(me);

	marker_me = new google.maps.Marker({
		position: me,
		title: "here"
	});

	marker_me.setMap(map);

	google.maps.event.addListener(marker_me, 'click', function(){
		infowindow_me.setContent(nearest_station);
		infowindow_me.open(map, marker_me);	
	});

}

/* Part 2:
	set marks for MBTA station and render polyline for redline
*/
var redline_station = [
{lat: 42.395428, lng: -71.142483},
{lat: 42.39674, lng: -71.121815},
{lat: 42.3884, lng:-71.11914899999999},
{lat:42.373362, lng: -71.118956},
{lat: 42.365486,lng: -71.103802},
{lat:42.36249079, lng: -71.08617653},
{lat: 42.361166, lng:-71.070628},
{lat: 42.35639457, lng:-71.0624242},
{lat: 42.355518,lng: -71.060225},
{lat: 42.352271, lng:-71.05524200000001},
{lat: 42.342622, lng:-71.056967},
{lat: 42.330154, lng:-71.057655},
{lat: 42.320685, lng:-71.052391},
{lat:42.275275, lng:-71.029583},
{lat:42.2665139,lng:-71.0203369},
{lat:42.251809,lng:-71.005409},
{lat:42.233391,lng:-71.007153},
{lat:42.2078543, lng:-71.0011385},
{lat:42.31129, lng:-71.053331},
{lat:42.300093,lng:-71.061667},
{lat:42.29312583, lng:-71.06573796000001},
{lat:42.284652,lng:-71.06448899999999},
];

var redline_name = [
"Alewife Station", 
"Davis Station", 
"Porter Square Station",
"Harvard Square Station",
"Central Square Station",
"Kendall Station",
"Charles/MGH Station",
"Park Street Station",
"Downtown Crossing Station",
"South Station",
"Broadway Station",
"Andrew Station",
"JFK/UMass Station",
"North Quincy Station",
"Wollaston Station",
"Quincy Center Station",
"Quincy Adams Station",
"Braintree Station",
"Savin Hill Station",
"Fields Corner",
"Shawmut Station",
"Ashmont Station"
]

//set marker for each station
function set_Marker(){
var image = "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png";

for (var i = 0; i < 22; i++){
var marker_station = new google.maps.Marker({
	position : redline_station[i],
	icon: image,
	map: map
	});
}

var redline_braintree = [
{lat: 42.395428, lng: -71.142483},
{lat: 42.39674, lng: -71.121815},
{lat: 42.3884, lng:-71.11914899999999},
{lat:42.373362, lng: -71.118956},
{lat: 42.365486,lng: -71.103802},
{lat:42.36249079, lng: -71.08617653},
{lat: 42.361166, lng:-71.070628},
{lat: 42.35639457, lng:-71.0624242},
{lat: 42.355518,lng: -71.060225},
{lat: 42.352271, lng:-71.05524200000001},
{lat: 42.342622, lng:-71.056967},
{lat: 42.330154, lng:-71.057655},
{lat: 42.320685, lng:-71.052391},
{lat:42.275275, lng:-71.029583},
{lat:42.2665139,lng:-71.0203369},
{lat:42.251809,lng:-71.005409},
{lat:42.233391,lng:-71.007153},
{lat:42.2078543, lng:-71.0011385}
]

var redline_two = [
{lat: 42.320685, lng:-71.052391},
{lat:42.31129, lng:-71.053331},
{lat:42.300093,lng:-71.061667},
{lat:42.29312583, lng:-71.06573796000001},
{lat:42.284652,lng:-71.06448899999999},
]

//render polyline on the map
var redline_path = new google.maps.Polyline({
	path: redline_braintree,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 3
});
//render the second polyline on the map
var redline_pathtwo = new google.maps.Polyline({
	path : redline_two,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 3
});

redline_path.setMap(map);
redline_pathtwo.setMap(map);

}


/*	Part 3: calculate the distance
	calculate distance of the closest station, render info in infowindow, 
	render polyline from current position to nearest station
*/
var R = 6371e3;
var distance = 0;

if (typeof(Number.prototype.toRad) == "undefined"){
	Number.prototype.toRad = function(){
		return this * Math.PI / 180;
	}
}

//calculate distance
var counter = 0;
for (i = 0; i < 22; i++){
	var lat1 = redline_station[i].lat.toRad();
	var lat2 = myLat.toRad();
	var LAT = (lat2 - lat1).toRad();
	var LNG = (myLng - redline_station[1].lng).toRad();

	var a = Math.sin(LAT/2) * Math.sin(LAT/2) + Math.cos(lat1) * Math.cos(lat2) *
	Math.sin(LNG/2) * Math.sin(LNG/2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	if (i == 0){
		distance = d;
	}else if (d < distance){
		distance = d;
		counter = i;
	}
}

//set info to my location marker
var nearest_station = 'Nearest RedLine Station: ' + redline_name[counter] +"<br>" + 
'Distance: ' + distance + ' miles';

var infowindow_me = new google.maps.InfoWindow({
	content : nearest_station
});

//render a polyline from me to nearest station
// HAVE a Problem rendering the line here!!!
function blueline(){
var nearest_distance = [
	{lat: myLat, lng: myLng},
	redline_station[counter]
];

var blueline = new google.maps.Polyline({
	path : nearest_distance,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 3
});
}


/*  Part 4: Request data from MBTA
	set train info for each station marker

*/
var request = new XMLHttpRequest();

request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
request.onreadystatechange = metroline;
request.send();

function metroline(){
	console.log("The data is =" + request.responseText);

	if (request.readyState == 4 && request.status == 200){

		message = request.responseText;
		metroData = JSON.parse (message);

	}
}


