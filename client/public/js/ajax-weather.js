$('.menu .item')
  .tab()
;

function getData(){

  var key = "3cf4bf019f05b262b3e7ae8f899feebe"
  var nameField = $("#city-zip");
  var query = "Hoboken";

  // query the API here!
  $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + query + '&units=imperial&cnt=7' + '&APPID=' + key, function(data){
    var allDates = data.list;

    for (var i = 0; i < allDates.length; i++) {
      var singleDate = allDates[i];
      var city = data.city.name;
      var date = data.list.dt;
      var temp = Math.round(singleDate.temp.day);
      console.log(temp);
      var sky = singleDate.weather.description;
      var minTemp = Math.round(singleDate.temp.min);
      var maxTemp = Math.round(singleDate.temp.max);

      function createWeatherDiv(index){
        var $weatherTab = $("<a class='item' data-tab="+index+">");
        $weatherTab.appendTo(".weather-week");

        var temperature = $('<h2>').text(temp + "˚");
        $weatherTab.append(temperature);

        var $weatherDiv = $('<div class="ui bottom attached tab segment" data-tab='+index+'>');
        $weatherDiv.append($('<table>Whazzup LGIO '+index+'</table>'))
        if (index===0){
          $weatherTab.addClass('active');
          $weatherDiv.addClass('active');
        }
        $weatherDiv.appendTo('.weather-data');
      }
      createWeatherDiv(i);


    }
    $('.menu .item').tab();

    $(".city-zip").text(city);

  });

}

$(function() {
  console.log("YO WUT UP");
  $('.ui.dropdown')
    .dropdown()
  ;
  getData();

  //TESTING
  // $('.menu .item')
  // .tab({
  //   cache: false,
  //   // faking API request
  //   apiSettings: {
  //     loadingDuration : 300,
  //     mockResponse    : function(settings) {
  //       var response = {
  //         first  : 'AJAX Tab One',
  //         second : 'AJAX Tab Two',
  //         third  : 'AJAX Tab Three'
  //       };
  //       return response[settings.urlData.tab];
  //     }
  //   },
  //   context : 'parent',
  //   auto    : true,
  //   path    : 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=1111111111'
  // });
  //TESTING

});// onLoad
