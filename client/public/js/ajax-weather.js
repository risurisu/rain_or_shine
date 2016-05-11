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

  // query the API here!
  $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zip + '&units=imperial&cnt=7' + '&APPID=' + key, function(data){
    console.log(data);
    var allDates = data.list;

    for (var i = 0; i < allDates.length; i++) {
      var singleDate = allDates[i];

      createWeatherAccordian(i,data,singleDate);
    }

    $(".city-zip").text(data.city.name);

  });

}



function createWeatherAccordian(index,data,singleDate){

  var date = singleDate.dt;

  var newTimeStamp = new Date();
  newTimeStamp.setTime(date*1000); // javascript timestamps are in milliseconds
  date = newTimeStamp.toDateString();

  console.log(date);



  var temp = Math.round(singleDate.temp.day);
  var weather = singleDate.weather;
  var weatherType = singleDate.weather[0].main;
  var weatherIcon = weather[0].icon + ".png";
  var minTemp = Math.round(singleDate.temp.min);
  var maxTemp = Math.round(singleDate.temp.max);
  var $mainDiv = $("#data-accordion");
  var icon = $("<i class='dropdown icon'></i>")
  var $weatherTab = $("<div>").addClass("title");

  $weatherTab.appendTo($mainDiv);
  icon.appendTo($weatherTab);

  var date = $('<h2>').text(date + " : ");

  var weatherIconImg = $("<img>").attr("src", "http://openweathermap.org/img/w/" + weatherIcon);
  console.log(weatherIconImg);

  var iconDiv = $('<span>').addClass("weather-image").append(weatherIconImg);
  var weatherTypeDiv = $('<span>').addClass("weather-type").append(weatherType);

  var temperature = $('<h2>').addClass("blue").text(temp + "˚");
  var min = $("<span>").text("Low " + minTemp + "˚");
  var max = $("<span>").text("High " + maxTemp + "˚");
  $weatherTab.append(date, temperature, iconDiv, weatherTypeDiv);


  var $eventDiv = $("<div>").addClass("content");

  // ***********************
  // event data should go into between the parenthesis below
  // ***********************


  if (index===0){
    $weatherTab.addClass('active');
    $eventDiv.addClass('active day1');
  }
  if (index===1){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day2');
  }
  if (index===2){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day3');
  }
  if (index===3){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day4');
  }
  if (index===4){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day5');
  }
  if (index===5){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day6');
  }
  if (index===6){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day7');
  }
  if (index===7){
    $weatherTab.addClass('active');
    $eventDiv.addClass('day3');
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



  $('.ui.accordion').accordion();



});// onLoad
