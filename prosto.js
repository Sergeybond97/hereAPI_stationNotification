function playmusic(name_sound) {
  var audio = new Audio(); 
  audio.src = 'name_sound'; 
  audio.autoplay = true; 
}
function rast(x,y)
{
	return sqrt(x*x+y*y);
}

function proverka_coord()
{
	return rast(posDirect.lat-posMy.lat,posDirect.lng-posMy.lng)<0.002;
}

