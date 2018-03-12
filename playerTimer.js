function PlayerTimer(element,normalTime,addedTime){

  var time = normalTime;
  var offset;
  var interval;

  function update(){

    if(this.isOn){
      time -= delta();
    }

    element.textContent = timeFormatter(time);

    if(time < 0){
      element.style.color = "red";
      clearInterval(interval);
      this.isOn = false;
      element.textContent = "Time end";
    }
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;

    offset = now;

    return timePassed;
  }

  function timeFormatter(time){
    time = new Date(time);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    return minutes + ' : ' + seconds;
  }

  this.start = function() {
    interval = setInterval(update.bind(this), 10);
    offset = Date.now();
    this.isOn = true;
  };

  this.stop = function() {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
  };

  this.add = function(){
    time += addedTime;
    update();
  };

  this.initializeTime = function(){
    element.textContent = timeFormatter(time);
  }

  this.isOn = false;
}
