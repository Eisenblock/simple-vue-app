<template>
<div class="background">
    <div class = camera>
        <video id = "video"></video>
        <button id = "startbutton">Take photo</button> 
    </div>
    <p>Last image taken</p>
    <canvas id="canvas"></canvas>
    <div class="output">
        <div v-for="(photo, index) in takenPhotos" :key="index" :src="photo" :alt="'Photo ' + (index + 1)">
            
        <!-- Einzelnes Bild-Element wird für jedes aufgenommene Bild erstellt -->
        <img :src="photo">
        <button @click="deletePhoto(index)">X</button>
    
        </div>
    </div>
</div>
</template>

<script>
//test
export default {

    name : 'Camera',

    data() {
        return {
            width: 400,
            height: 0,
            streaming: false,
            video: null,    
            canvas: null,
            photo: null,
            startbutton: null,
            takenPhotos: [],
            deleteButton: [],
        }
    },
    
    mounted() {
    this.startUp();
    },

    methods: {
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
        this.clearphoto();
    },
    clearphoto(){
        const context = this.canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    },

    takePicture(){
    const context = this.canvas.getContext("2d");
    if(this.width && this.height){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        context.drawImage(this.video, 0, 0, this.width, this.height);

        const data = this.canvas.toDataURL("image/png");

        this.takenPhotos.push(data);
        

    } else {
        this.clearphoto();
    }},

    deletePhoto(index){
    this.takenPhotos.splice(index, 1);
}

}
}
</script>

<style>

*{
    padding: 0;
    margin: 0;
}

.background{
    background-color: #424549;
}

p{
    font-size: 30px;
    display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 5px;
  color: white;
}
.camera {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#video {
  width: 35%;
  height: auto;
}

button {
  margin-top: 20px;
  width: 10%;
  scale: 100%;
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
  background-color: #812ba3;
  color: white;
}

canvas {

  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 50px;
}

.output{
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 Spalten */
    margin-left: 6%;
    margin-top: 3%;
    gap: 40px;
    padding-right: 0;
}
</style>