$(function () {
  // Saves events to local storage
  var events = [];

  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();
    var dateAdded = dayjs().format("dddd, MMMM Do YYYY, h:mm:ss a");
    events.push({
      description: description,
      time: timeBlockId,
      date: dateAdded,
    });
    localStorage.setItem("events", JSON.stringify(events));
    alert("Event saved!");
  });
  // Updates the hour, and changes the color of the time block based on the current hour
  function updateHour() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
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
  // Sets the time interval to 15 seconds, and updates the hour every 15 seconds
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
  // Displays the current day at the top of the page
  var currentDay = dayjs().format("dddd, MMMM D");
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    $("#" + key + " .description").val(value);
  }
  // Retrieves events from local storage
  var storedEvents = JSON.parse(localStorage.getItem("events"));
  if (storedEvents !== null) {
    events = storedEvents;
  }
  // Displays events from local storage
  for (var i = 0; i < events.length; i++) {
    var userDescription = events[i].description;
    $("#" + events[i].time)
      .children(".description")
      .val(userDescription);
  }
  // Displays the current day at the top of the page
  $("#currentDay").text(currentDay);
});
