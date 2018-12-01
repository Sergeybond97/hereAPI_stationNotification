 function moveToPoint(map){
      map.setCenter({lat:55.753058, lng:37.626213});
      map.setZoom(14);
}
				
var platform = new H.service.Platform({
'app_id': 'XYxrbfSPmGIEAfx7DrfT',
'app_code': 'uu7bwAtycRRaxivG52NVdA'
});

//Settings
var pixelRatio = window.devicePixelRatio || 1;



// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
document.getElementById('mapContainer'),
defaultLayers.normal.map,
{
	zoom: 10,
	center: { lat: 55.753058, lng: 37.626213 }
});

moveToPoint(map);
			
			