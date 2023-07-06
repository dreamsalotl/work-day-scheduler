$(function () {

  var events = [];

  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();
    var dateAdded = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    events.push({description: value, time: time, date: dateAdded});
    console.log(timeBlockId);
    console.log(description);
    localStorage.setItem(timeBlockId, description);
  });

  function updateHour() {
    var currentHour = dayjs().hour();
    console.log(currentHour);

    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
      console.log(timeBlockHour);
      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateHour();

  var secondsLeft = 15;
  function setTime() {
    var timerInterval = setInterval(function () {
      secondsLeft--;

      if (secondsLeft === 0) {
        updateHour();
        secondsLeft = 15;
      }
    }, 1000);
  }

  setTime();

  var currentDay = dayjs().format("dddd, MMMM D");
  console.log(currentDay);
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    console.log(key, value);
    $("#" + key + " .description").val(value);
  }

  var storedEvents = JSON.parse(localStorage.getItem("events"));
  if (storedEvents !== null) {
    events = storedEvents;
  }

  for (var i = 0; i < events.length; i++) {
    var timeBlockId = events[i].time;
    var description = events[i].description;
    $("#" + timeBlockId + " .description").val(description);
  }

  $("#currentDay").text(currentDay);
});


