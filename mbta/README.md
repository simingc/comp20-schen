Assignment 2 MBTA

Written by Siming Chen
Date: 20 October 2016

1. All aspects of the assignments are implemented.

Implementation:

The index.html will render a map taking the entire page,
it will mark the red line using specific marker and red polyline.
It will determine user's geolocation and place a marker, it will render a blueline to the nearest station automatically. If click on the marker, it will also show the info of nearest station in an info window.
If click on marker of each station, it will show the mbta schedule of upcoming train for that station. The info window of station marker will close if clicking on another station marker, but the info window of user's place marker can co-exist with other info-window.

Coding in five parts:

Part 1: set up map in general, including init map, get geolocation, render on web

Part 2: set polyline for redline

Part 3: calculate distance from user to closes station, render user's info window and a polyline to closest station

Part 4: Resquest data from MBTA API, sort the info into each station

Part 5: Render markers and info window for each station