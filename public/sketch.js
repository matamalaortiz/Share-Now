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

}

function gotFile(file) {
    var data = {
        img: file.data,
    }

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
