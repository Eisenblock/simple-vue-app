<template>

<div class = camera>
    <video id = "video"></video>
    <button @click="startUp" id = "startbutton">Take photo</button> 
</div>
<canvas id = "canvas"></canvas>
<div class = "output">
    <img id = "photo" alt = "The Screen capture will appear here."/>
</div>
  

</template>

<script>
//test
export default {

    name : 'Camera',

    data() {
        return {
            width: 320,
            height: 0,
            streaming: false,
            video: null,    
            canvas: null,
            photo: null,
            startbutton: null,
        }
    },

    methods: {

        showViewLiveResultButton(){
            if(window.self !== window.top){
               document.querySelector(".contentarea").remove();
               const button = document.createElement("button");
               button.textContent = "View Live Result";
               document.body.appendChild(button);
            }
        },

    startUp()
    {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.photo = document.getElementById('photo');
        this.startbutton = document.getElementById("startbutton");
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then((stream) => {
            this.video.srcObject = stream;
            this.video.play();
        })
        .catch((err) => {
            console.log("An error occurred: " + err);
        });

        this.video.addEventListener(
            "canplay", 
            (ev) => {
                if(!this.streaming){
                    this.height = (this.video.videoHeight / this.video.videoWidth) * this.width;

                    this.video.setAttribute("width", this.width);
                    this.video.setAttribute("height", this.height);
                    this.canvas.setAttribute("width", this.width);
                    this.canvas.setAttribute("height",this.height);
                    this.streaming = true;
                }
            },
            false,
        )

        this.startbutton.addEventListener(
            "click",
            (ev) => {
                this.takePicture();
                ev.preventDefault();
            },
            false,
        );
        clearphoto();
    },
    clearphoto (){
        const context = this.canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const data = canvas.toDataURL("image/png");
        this.photo.setAttribute("src",data);
    },
    takePicture(){
    const context = this.canvas.getContext("2d");
    if(this.width && this.height){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        context.drawImage(this.video, 0, 0, this.width, this.height);

        const data = this.canvas.toDataURL("image/png");
        this.photo.setAttribute("src",data);
    } else {
        clearphoto();
    }
}
},
}

</script>

<style>

</style>