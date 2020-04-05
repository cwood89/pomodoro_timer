
let timer = {
  //changed time limit for testing
  timeLeft: 10, // 25 minutes in seconds = 1500
  breakTime: 3, // 5 minutes in seconds = 300
  timeCounter: null,
  breakCounter: null,
  start: function () {
    if (this.timeLeft > 0) {
      this.startTimer();
    } else {
      this.startBreak();
    }
  },
  startTimer: function () {
    let self = this;
    this.timeCounter = setInterval(function() {
      self.timeLeft--;
      self.displayTime();
      if (self.timeLeft === 0) {
        self.toggleTime();
        self.playSound();
        alert("Break Time!")
        self.startBreak();
      }
    }, 1000)
  },
  startBreak: function () {
    let self = this;
    this.breakCounter = setInterval(function () {
      self.breakTime--;
      self.displayBreak();
      if (self.breakTime === 0) {
        self.playSound();
        alert("Break over!");
        self.restart();
      }
    }, 1000)
  },
  toggleTime: function () {
    clearInterval(this.timeCounter);
    clearInterval(this.breakCounter);
  },
  restart: function () {
    this.toggleTime();
    this.timeLeft = 1500;
    this.breakTime = 300;
    this.displayTime();
  },
  displayTime: function () {
    var minutes = Math.floor(this.timeLeft / 60);
    var seconds = this.timeLeft - minutes * 60;
    seconds = seconds.toString();
    minutes = minutes.toString();
    if (minutes.length < 2) { minutes = "0" + minutes };
    if (seconds.length < 2) { seconds = "0" + seconds };
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    document.getElementById("tab-timer").innerHTML = minutes + ":" + seconds + " - Pomodoro Timer";
  },
  displayBreak: function () {
    var minutes = Math.floor(this.breakTime / 60);
    var seconds = this.breakTime - minutes * 60;
    seconds = seconds.toString();
    minutes = minutes.toString();
    if (minutes.length < 2) { minutes = "0" + minutes };
    if (seconds.length < 2) { seconds = "0" + seconds };
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    document.getElementById("tab-timer").innerHTML = minutes + ":" + seconds + " - Pomodoro Timer";;
  },
  playSound: function() {
    document.getElementById('alarm').play();
 }
}
timer.displayTime();