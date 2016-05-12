$(".search").click(function(){
  //this will find the selected website from the dropdown
  var go_to_url = $("#websites").find(":selected").val();

  //this will redirect us in same window
  document.location.href = weather.html;
});

// $("#thunder").appendTo(.weather)
