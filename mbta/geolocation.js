//setup the map in general

var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var mapOptions = {
	center: me,
	zoom: 15
};
var map;
var marker;
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

	marker = new google.maps.Marker({
		position: me,
		title: "here"
	});

	marker.setMap(map);

	google.maps.event.addListener(marker, 'click', function(){
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);	
	});

}

//set marks for MBTA station
function set_Marker(){
var image = "file:///Users/user/Downloads/ic_donut_large_black_24px.svg";

var redline_station = [
{position: new google.maps.LatLng(42.352271, -71.05524200000001),
type: 'info'},
{position: new google.maps.LatLng(42.330154, -71.057655),
type: 'info'},
{position: new google.maps.LatLng(42.3884, -71.11914899999999),
type: 'info'},
{position: new google.maps.LatLng(42.373362, -71.118956),
type: 'info'},
{position: new google.maps.LatLng(42.320685, -71.052391),
type: 'info'},
{position: new google.maps.LatLng(42.31129, -71.053331),
type: 'info'},
{position: new google.maps.LatLng(42.35639457, -71.0624242),
type: 'info'},
{position: new google.maps.LatLng(42.342622, -71.056967),
type: 'info'},
{position: new google.maps.LatLng(42.275275, -71.029583),
type: 'info'},
{position: new google.maps.LatLng(42.29312583, -71.06573796000001),
type: 'info'},
{position: new google.maps.LatLng(42.395428, -71.121815),
type: 'info'},
{position: new google.maps.LatLng(42.352271, -71.142483),
type: 'info'},
{position: new google.maps.LatLng(42.36249079, -71.08617653),
type: 'info'},
{position: new google.maps.LatLng(42.361166, -71.070628),
type: 'info'},
{position: new google.maps.LatLng(42.355518,-71.060225),
type: 'info'},
{position: new google.maps.LatLng(42.251809,-71.005409),
type: 'info'},
{position: new google.maps.LatLng(42.233391,-71.007153),
type: 'info'},
{position: new google.maps.LatLng(42.284652,-71.06448899999999),
type: 'info'},
{position: new google.maps.LatLng(42.2665139,-71.0203369),
type: 'info'},
{position: new google.maps.LatLng(42.300093,-71.061667),
type: 'info'},
{position: new google.maps.LatLng(42.365486,-71.103802),
type: 'info'},
{position: new google.maps.LatLng(42.2078543, -71.0011385),
type: 'info'},
];


var marker = new google.maps.Marker({
	position = {lat: 42.2078543, lng:-71.0011385},
	icon: image,
	map: map
	});
}

}


// request data from MBTA
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


