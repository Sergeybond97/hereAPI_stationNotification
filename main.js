 
				
var platform = new H.service.Platform({
'app_id': 'XYxrbfSPmGIEAfx7DrfT',
'app_code': 'uu7bwAtycRRaxivG52NVdA'
});

//Variables ---------------------------------------------------------------------------

var myPosition = {
	lat: 55.708207846, // Initial data (Center of Moscow)
	lng: 37.626727984
};

var targetPosition = {
	lat: 55.740739007, // Initial data (Center of Moscow)
	lng: 37.627629206
};

//Settings ---------------------------------------------------------------------------
var pixelRatio = window.devicePixelRatio || 1;

// Show map ---------------------------------------------------------------------------

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
document.getElementById('mapContainer'),
defaultLayers.normal.map,
{
	pixelRatio: pixelRatio,
	zoom: 10,
	center: { lat: 55.753058, lng: 37.626213 }
});

// UI ---------------------------------------------------------------------------

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); //UI
var ui = H.ui.UI.createDefault(map, defaultLayers);

/*
// Create an info bubble object at a specific geographic location:
var bubble = new H.ui.InfoBubble({ lat: 55.830885, lng: 37.672322 }, {
	content: 'Test Message!'
   });

// Add info bubble to the UI:
ui.addBubble(bubble);
*/


function addDraggableMarker(map, behavior){

	var marker = new H.map.Marker({lat: 55.740739007, lng: 37.627629206}); // Initial data (Center of Moscow)
	// Ensure that the marker can receive drag events
	marker.draggable = true;
	map.addObject(marker);
  
	// disable the default draggability of the underlying map
	// when starting to drag a marker object:
	map.addEventListener('dragstart', function(ev) {
	  var target = ev.target;
	  if (target instanceof H.map.Marker) {
		behavior.disable();
	  }
	}, false);
  
  
	// re-enable the default draggability of the underlying map
	// when dragging has completed
	map.addEventListener('dragend', function(ev) {
	  var target = ev.target;
	  if (target instanceof mapsjs.map.Marker) {
		  targetPosition = target.getPosition();
		  //targetPosition.lng;
		behavior.enable();
	  }
	}, false);
  
	// Listen to the drag event and move the position of the marker
	// as necessary
	 map.addEventListener('drag', function(ev) {
	  var target = ev.target,
		  pointer = ev.currentPointer;
	  if (target instanceof mapsjs.map.Marker) {
		target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
	  }
	}, false);
  }

  addDraggableMarker(map, behavior) // Add dragable marker to map



// Positioning ---------------------------------------------------------------------------

function findMyPos() {  // Function for finding user's position
	var pos = {
		lat: 55.753058,
		lng: 37.626213
	};

	if (!navigator.geolocation){
	  alert('Geolocation is not supported by your browser');
	  return;
	}
  
	function success(position) {
	 	pos.lat  = position.coords.latitude;
		pos.lng = position.coords.longitude;

	    //alert('Latitude is ' + pos.lat + '°\nLongitude is ' + pos.lng + '°');
	};
  
	function error() {
	  alert('Unable to retrieve your location');
	};
  
	navigator.geolocation.getCurrentPosition(success, error);
	
	return pos;
  }



//For Show      myPosition = findMyPos(); // Find user's position

var myPositionMarker = new H.map.Marker(myPosition); // Create user's position marker
map.addObject(myPositionMarker);


// Loop for updating user's position
var i = 1;
var timerId = setTimeout(function tick() {

	console.log( "Update positon");

	myPosition.lat += 0.001; // Вместо geoFindMe();
	//For Show      myPosition = findMyPos(); // Find user's position

	myPositionMarker.setPosition(myPosition); // Update marker

	
	var d = myPositionMarker.getPosition().distance(targetPosition);
	console.log(d);

	if (d < 250){
		console.log("Dest Reached");	
		alert("Destination reached!\nGet ready for yor station!");
	}

	i++;
	timerId = setTimeout(tick, 1000);

	}, 1000);