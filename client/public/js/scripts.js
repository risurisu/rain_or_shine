console.log("OWLS IN THE HOUSE");

// $pastSearches = $("#past-searches")

// $pastSearches.append ( $newTemp )  // allows to appear on user profile

var auth = auth || {};

auth.bindLoginForm = function(){

  $("#login-form").on("submit", function(e){
    e.preventDefault();
    auth.submitLoginForm();
  });

};

auth.submitLoginForm = function(){
  var $form = $("#login-form");
  var username = $form.find("[name=username]").val();
  var password = $form.find("[name=password]").val();

  var payload = {
    username: username,
    password: password
  };

  $.post('/api/auth', payload)
    .done(auth.loginSuccess)
    .fail(auth.loginFailure);

};


auth.loginSuccess = function( data, status, jqXHR){
  Cookies.set("jwt_token", data.token);
  auth.setLoggedInState();
  window.location.href = data.redirect
};

auth.loginFailure = function(jqXHR){
  if( jqXHR == 401 ){
    auth.showAlert("Invalid Credentials");
  }
};

auth.setLoggedInState = function(){
  $("#login").hide();
  $("#logged-in-content").fadeIn(1000);
  auth.users.init();
};

auth.showAlert = function(msg){
  $("#alert-msg").text(msg).fadeIn(1000, function(){
    $(this).fadeOut(1000);
  })
};

auth.users = {
  init: function(){
      auth.users.getAll()
        .done(function(users){
          auth.users.renderUsers(users);
        })
        .fail( function(jqXHR){
            console.log(jqHXR);
        });
  },
  getAll: function(){
    return $.getJSON("/api/users");
  },
  renderUsers: function(users){
    var $container = $("#users-container");
    users.forEach( function(user){
      var $user = $("<li>");
      $user.html("Username: " + user.username + " <br/> Email: " + user.email );
      $container.append($user);
    });
  }

}



auth.bindSwitchFormLinks = function(){
  $("#login-link").on("click", function(e){
    $("#login").hide();
    $("#signup" ).fadeIn();
  });
  $("#sign-up-link").on("click", function(e){
    $("#signup").hide();
    $("#login" ).fadeIn();
  });

};

auth.bindLogoutLink = function(){
  $("#log-out-link").on("click", function(e){
    console.log("click");
    Cookies.remove("jwt_token");
    auth.checkLoggedInStatus();
  } );
}

auth.checkLoggedInStatus= function(){
  var token = auth.getToken();

  if(token){
    auth.setLoggedInState();
  } else {
    auth.setLoggedOutState();
  }
};


auth.getToken = function(){
  return Cookies.get("jwt_token");
}


auth.setLoggedOutState = function() {
  $('#logged-in-content').hide();
  $('#login').fadeIn(1000);
}

auth.bindSignUpForm = function(){
  $('#sign-up-form').on('submit', function(e) {
    e.preventDefault();
    auth.submitSignUpForm();
  });
};

auth.switchFormsOnSignup = function(){

}

auth.submitSignUpForm = function(){
  var $form    = $('#sign-up-form');
  var username = $form.find('[name=username]').val();
  var password = $form.find('[name=password]').val();
  var email    = $form.find('[name=email]').val();
  var confirm  = $form.find('[name=password_confirm]').val();

  if (confirm !== password) {
    return auth.showAlert("Passwords do not match!");
  }

  var payload = {
    user: {
      username: username,
      email : email,
      password: password
    }
  };

  $.post('/api/users', payload)
    .done(auth.signUpSuccess)
    .fail(auth.signUpFailure)

  $("#signup").hide();
  $("#login" ).fadeIn();

};

auth.signUpSuccess = function(data, status, jqXHR) {
  console.log(data, status, jqXHR);
  // should show a success alert
}

auth.signUpFailure = function(jqXHR) {
  auth.showAlert("There was an error. Try again!");
}



// $weatherSearch.submit(function(event){
//   event.preventDefault();         // so form does not submit
//
//   city = $weatherSearch.find("[name=weather]").val();    // grab weather text value
//
//   $.ajax({ method: "get",
//             url: "http://api.openweathermap.org/data/2.5/weather",
//             data: {
//               APPID: "1f28dd1e99009db01e1b392354c4d6c9",
//               q: city,
//               units: "imperial"
//             }
//         }).success( function(data){            // ADD ADDITIONAL DATA HERE. MAYBE FOR EVENTS??
//             // saving on our server under the current user
//             $.ajax({ method: "post",
//                      url: "/weather",
//                      data: { weather:{
//                               location: city,
//                               temperature: data.main.temp      // taken from weatherSchema in weather model 
//                               }
//                      }
//                   }).success( renderWeather );   // + renderEvent??
//         });
// }); // weatherSearch
//
// $logoutLink.click(function(e){
//     Cookies.remove("jwt_token");
//     location.reload();      // refresh the page on logout
// });

$(function(){
  auth.checkLoggedInStatus();
  auth.bindLoginForm();
  auth.bindSignUpForm();
  auth.bindSwitchFormLinks();
  auth.bindLogoutLink();
});
