var dropzone;
var socket;


function setup() {
    createCanvas(100, 100);

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);

    // Listen Sockets
    socket = io.connect();


    // Receving IMG from Server
    socket.on('img_from_server', newImg);

    function newImg(data) {
        var img = createImg(data.img);
    }

    // Receive User ID from server

    socket.on('uid_from_server', userUid);


    function userUid(data){
      var user = data;
      console.log(user);


      currentUsers = user;

      if (currentUsers ===  1 ) {
        document.getElementById('clients').innerHTML = 'You are alone in the room. :(';
      } else {
        document.getElementById('clients').innerHTML = 'We are ' + user + ' users in the room.';

      }
    }

}

function gotFile(file) {
    var data = {
        img: file.data,
    }

// Send to server
    socket.emit('dropped_img', data)

    var img = createImg(file.data);
    console.log(file.data)
}




function highlight() {
    dropzone.style('background-color', 'rgba(152, 47, 47, 0.67)');
}

function unhighlight() {
    dropzone.style('background-color', 'rgba(255, 255, 255, 0)');
}
