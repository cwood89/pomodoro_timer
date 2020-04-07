let timer = {
  //changed time limit for testing
  timeLeft: 10, // 25 minutes in seconds = 1500
  shortBreakTime: 10, // 5 minutes in seconds = 300
  longBreakTime: 1200, // 20 minutes in seconds = 1200
  totalPomodoros: 0,
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
      self.displayTime(self.timeLeft);
      if (self.timeLeft === 0) {
        self.totalPomodoros++;
        self.toggleTime();
        self.playSound();
        alert("Break Time!")
        self.startBreak();
      }
    }, 1000)
  },

  startBreak: function () {
    let self = this;
    let breakTime;
    // check for total pomodoros here.
    if (this.totalPomodoros < 4) {
      breakTime = this.shortBreakTime;
    } else {
      this.totalPomodoros = 0;
      breakTime = this.longBreakTime;
     }
    this.breakCounter = setInterval(function () {
      breakTime--;
      self.displayTime(breakTime);
      if (breakTime === 0) {
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
    this.shortBreakTime = 300;
    this.longBreakTime = 1200;
    this.displayTime(this.timeLeft);
  },
  displayTime: function (time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    seconds = seconds.toString();
    minutes = minutes.toString();
    if (minutes.length < 2) { minutes = "0" + minutes };
    if (seconds.length < 2) { seconds = "0" + seconds };
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    document.getElementById("tab-timer").innerHTML = minutes + ":" + seconds + " - Pomodoro Timer";
  },
  playSound: function() {
    document.getElementById('alarm').play();
 }
}
timer.displayTime(timer.timeLeft);

let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    done: false,
    id: Date.now()
  };

  todoItems.push(todo);

  const emptyMessage = document.querySelector("#empty");
  if (emptyMessage) {
    emptyMessage.remove();
  }

  const list = document.querySelector('#todo-list');

  list.insertAdjacentHTML('afterbegin', `
  <li class="list-group-item d-flex justify-content-between align-items-center" data-key="${todo.id}">
  ${todo.text}
  <span class="buttons">
    <span onClick="complete('${todo.id}')" class="badge badge-success badge-pill hover">
      <i class="fa fa-check"></i>
    </span>
    <span onClick="deleteTodo('${todo.id}')" class="badge badge-danger badge-pill hover">
      <i class="fa fa-times"></i>
    </span>
  </span>
  </li>
  `);

  console.log(todoItems);
}

const form = document.querySelector("#todo-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const input = document.querySelector("#todo-input");
  const text = input.value.trim();

  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
})

function complete(id) {
  const index = todoItems.findIndex(item => item.id === Number(id));
  todoItems[index].done = !todoItems[index].done;
  
  const item = document.querySelector(`[data-key='${id}']`);
  
  if (todoItems[index].done) {
    item.classList.add("done");
  } else {
    item.classList.remove("done")
  }
  
};

function deleteTodo(id) {
  todoItems = todoItems.filter(item => item.id !== Number(id));
  const item = document.querySelector(`[data-key='${id}']`);
  item.remove();
}