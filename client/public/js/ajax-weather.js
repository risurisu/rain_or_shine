$('.menu .item').tab();

var zip;
function getZip(form){
  $("i").on("click", function(){
    zip = form.find("[name=zip]").val();
    $(".modal-zip").fadeOut();
    getData(zip);
  })
}

function getData(zip){
  var key = "3cf4bf019f05b262b3e7ae8f899feebe"
  var query = "Hoboken";

  // query the API here!
  $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + zip + '&units=imperial&cnt=7' + '&APPID=' + key, function(data){
    var allDates = data.list;

    for (var i = 0; i < allDates.length; i++) {
      var singleDate = allDates[i];

      createWeatherAccordian(i,data,singleDate);
    }

    $(".city-zip").text(data.city.name);

  });

}



function createWeatherAccordian(index,data,singleDate){

  var date = data.list.dt;
  var temp = Math.round(singleDate.temp.day);
  var sky = singleDate.weather.description;
  var minTemp = Math.round(singleDate.temp.min);
  var maxTemp = Math.round(singleDate.temp.max);

  var $mainDiv = $("#data-accordion");

  var $weatherTab = $("<div>").addClass("title");
  $weatherTab.appendTo($mainDiv);

  var temperature = $('<h2>').text(temp + "˚");
  var min = $("<p>").text(minTemp + "˚");
  var max = $("<p>").text(maxTemp + "˚");
  $weatherTab.append(temperature);

  var $eventDiv = $("<div>").addClass("content");

  $("#cloudy").appendTo(.description);
  $("#partly-cloudy").appendTo(.description);
  $("#rainy").appendTo(.description);
  $("#sunny").appendTo(.description);
  $("#windy").appendTo(.description);

  // ***********************
  // event data should go into between the parenthesis below
  // ***********************
  $eventDiv.append(  );

  if (index===0){
    $weatherTab.addClass('active');
    $eventDiv.addClass('active');
  }
  $eventDiv.appendTo($mainDiv)
}


// function eventParser() {
// 	var severalEvents = mapEvents;
//   // console.log(severalEvents);
//
//   for (var i = 0; i < severalEvents.length; i++) {
//     var singleEvent = severalEvents[i];
//     var title = singleEvent.title;
//     var category = singleEvent.type;
//     var location = singleEvent.venue_name;
//   }
// }


$(function() {
  console.log("YO WUT UP");

  $('.ui.dropdown').dropdown();
  var $form = $(".search-form");

  getZip($form);
  $('.ui.icon.input')
    .form({
      fields: {
        zip : 'empty',
      }
  });
  eventParser();

  $('.ui.accordion').accordion();


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
