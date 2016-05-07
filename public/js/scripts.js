
function getData(){
    var $weather = $('.weather');
    var key = '1f28dd1e99009db01e1b392354c4d6c9';
    var queryString = $('input[name="name"').val();
    console.log(queryString);






$.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?q=' + queryString + '&APPID=' + key, function(data){
     var main = data.list[0].weather[0].main;
     var desc = data.list[0].weather[0].description;
     var min = data.list[0].temperature.min;
     var min = data.list[0].temperature.max;
     console.log(temp);
     $weather.empty();
     var $temperature = $('<h1>').addClass('temp').html(temp + '&deg;F');
     var $description = $('<h2>').addClass('desc').text(main +', '+ desc +'!');
     var $maxTemp = $('<h2>').addClass('max').text(temp_max + '&deg;F');
     var $minTemp = $('<h2>').addClass('min').text(temp_min + '&deg;F' ) ;
     $weather.append($temperature);
     $weather.append($description);
     $weather.append($maxTemp);
     $weather.append($minTemp);
     $weather.removeClass('hidden');
     $weather.on('click', function(){
       $weather.addClass('hidden');
     })

   });


// ghetto for loop to get seven days

// options are either a for loop or .each. Explore further.

var sevenDayForecast = main.length;
for (var i = 0; i < 6; i++) {
    console.log(sevenDayForecast);
}
