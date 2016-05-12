$.post({url: "/events",
method: "post",
data: {
  name: "Second time"
},
success: function(data){ console.log(data) }
})
