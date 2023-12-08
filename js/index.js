console.log("Welcome to Spotify");

let songsInfo=[
    {name:"Alone", path:"./songs/alone.mp3", img:"./covers/alone.jpg"},
    {name:"Cradles", path:"./songs/cradles.mp3", img:"./covers/cradles.png"},
    {name:"Fade", path:"./songs/fade.mp3", img:"./covers/fade.jpg"},
    {name:"Invincible", path:"./songs/invincible.mp3", img:"./covers/invincible.jpg"},
    {name:"Legion", path:"./songs/legion.mp3", img:"./covers/legion.jpg"},
    {name:"Light It Up", path:"./songs/lightItUp.mp3", img:"./covers/lightItUp.jpg"},
    {name:"On & On", path:"./songs/onAndOn.mp3", img:"./covers/onAndOn.jpg"},
    {name:"Royalty", path:"./songs/royalty.mp3", img:"./covers/royalty.jpg"},
    {name:"Trap", path:"./songs/trap.mp3", img:"./covers/trap.jpg"},
    {name:"True Love", path:"./songs/trueLove.mp3", img:"./covers/trueLove.jpg"},
    {name:"Why we lose", path:"./songs/whyWeLose.mp3", img:"./covers/whyWeLose.jpg"}
];

songsInfo.forEach((element,i)=>{
    document.querySelector('.all-song').innerHTML+=`
    <div class="song-item">
        <img src="${songsInfo[i].img}" alt="${songsInfo[i].name}">
        <p>${songsInfo[i].name}</p>
        <div class="song-buttons">
            <i class="fa-solid fa-plus song-play addButton-${i+1}" id="addButton" style="color: #f4f4f4;"></i>
            <i class="fa-solid fa-circle-play song-play" id="song-play" style="color: #f4f4f4;"></i>
        </div>
    </div>
    `;
})

let index=0;
let playlistIndex=0;
let currType=0;
let currSong=new Audio("./songs/alone.mp3");
// document.body.addEventListener('click',()=>{currSong.play();});
let marterPlayButton=document.querySelector("#masterPlay");
let masterForwardButton=document.querySelector('#masterForward');
let masterBackButton=document.querySelector('#masterBack');
let playlistPlayButton=document.querySelector('#playlistButton');

let allSongArray=document.querySelectorAll('#song-play');

let playlistContent=[];

// bootom part

document.querySelector('#volume-button').addEventListener('click',()=>{
    if(document.querySelector('#volume-button').classList.contains('fa-volume-xmark') && currSong.volume===0){
        currSong.volume=1;
        document.querySelector('.volume-bar').value=100;
        document.querySelector('#volume-button').classList.remove('fa-volume-xmark');
        document.querySelector('#volume-button').classList.add('fa-volume-high');
        currSong.muted=false;
    }
    else if(document.querySelector('#volume-button').classList.contains('fa-volume-xmark')){
        document.querySelector('#volume-button').classList.remove('fa-volume-xmark');
        document.querySelector('#volume-button').classList.add('fa-volume-high');
        currSong.muted=false;
    }
    else{
        document.querySelector('#volume-button').classList.remove('fa-volume-high');
        document.querySelector('#volume-button').classList.add('fa-volume-xmark');
        currSong.muted=true;
    }
});

document.querySelector('.volume-bar').addEventListener('input',()=>{
    currSong.volume=document.querySelector('.volume-bar').value/100;
    if(currSong.volume===0)
    {
        document.querySelector('#volume-button').classList.remove('fa-volume-high');
        document.querySelector('#volume-button').classList.add('fa-volume-xmark');
        currSong.muted=true;
    }
    else if(document.querySelector('#volume-button').classList.contains('fa-volume-xmark'))
    {
        document.querySelector('#volume-button').classList.remove('fa-volume-xmark');
        document.querySelector('#volume-button').classList.add('fa-volume-high');
        currSong.muted=false;
    }
});

document.querySelector('#masterPlay').addEventListener('click', ()=>{
    if(currSong.paused){
        currSong.play();
        allSongArray[index].classList.remove('fa-circle-play');
        allSongArray[index].classList.add('fa-circle-pause');
        document.querySelector("#masterPlay").classList.remove('fa-circle-play');
        document.querySelector("#masterPlay").classList.add('fa-circle-pause');
        playlistContent.forEach((element)=>{
            if(element.id.split('-')[2]-1==index){
                element.children[2].children[1].classList.remove('fa-circle-play');
                element.children[2].children[1].classList.add('fa-circle-pause');
            }
        })
    }
    else{
        currSong.pause();
        allSongArray[index].classList.remove('fa-circle-pause');
        allSongArray[index].classList.add('fa-circle-play');
        document.querySelector("#masterPlay").classList.remove('fa-circle-pause');
        document.querySelector("#masterPlay").classList.add('fa-circle-play');
        playlistContent.forEach((element)=>{
            if(element.id.split('-')[2]-1==index){
                element.children[2].children[1].classList.remove('fa-circle-pause');
                element.children[2].children[1].classList.add('fa-circle-play');
            }
        })
    }
});

document.body.addEventListener('keydown', (e)=>{
    if(e.code=='Space'){
        if(currSong.paused){
            currSong.play();
            allSongArray[index].classList.remove('fa-circle-play');
            allSongArray[index].classList.add('fa-circle-pause');
            document.querySelector("#masterPlay").classList.remove('fa-circle-play');
            document.querySelector("#masterPlay").classList.add('fa-circle-pause');
            playlistContent.forEach((element)=>{
                if(element.id.split('-')[2]-1==index){
                    element.children[2].children[1].classList.remove('fa-circle-play');
                    element.children[2].children[1].classList.add('fa-circle-pause');
                }
            })
        }
        else{
            currSong.pause();
            allSongArray[index].classList.remove('fa-circle-pause');
            allSongArray[index].classList.add('fa-circle-play');
            document.querySelector("#masterPlay").classList.remove('fa-circle-pause');
            document.querySelector("#masterPlay").classList.add('fa-circle-play');
            playlistContent.forEach((element)=>{
                if(element.id.split('-')[2]-1==index){
                    element.children[2].children[1].classList.remove('fa-circle-pause');
                    element.children[2].children[1].classList.add('fa-circle-play');
                }
            })
        }
    }
});

document.querySelector('#masterBack').addEventListener('click',(event)=>{
    if(allSongArray[index].classList.contains('fa-circle-pause')==true)
    {
        allSongArray[index].classList.remove('fa-circle-pause');
        allSongArray[index].classList.add('fa-circle-play');
    }
    playlistContent.forEach((element)=>{
        if(element.id.split('-')[2]-1==index){
            element.children[2].children[1].classList.remove('fa-circle-pause');
            element.children[2].children[1].classList.add('fa-circle-play');
        }
    })
    index--;
    if(index<0) index=songsInfo.length-1;
    playlistContent.forEach((element)=>{
        if(element.id.split('-')[2]-1==index){
            element.children[2].children[1].classList.remove('fa-circle-play');
            element.children[2].children[1].classList.add('fa-circle-pause');
        }
    })
    allSongArray[index].classList.remove('fa-circle-play');
    allSongArray[index].classList.add('fa-circle-pause');
    clicked(index);
})
document.querySelector('#masterForward').addEventListener('click',()=>{
    if(allSongArray[index].classList.contains('fa-circle-pause')==true)
    {
        allSongArray[index].classList.remove('fa-circle-pause');
        allSongArray[index].classList.add('fa-circle-play');
    }
    playlistContent.forEach((element)=>{
        if(element.id.split('-')[2]-1==index){
            element.children[2].children[1].classList.remove('fa-circle-pause');
            element.children[2].children[1].classList.add('fa-circle-play');
        }
    })
    index++;
    index=index%songsInfo.length;
    playlistContent.forEach((element)=>{
        if(element.id.split('-')[2]-1==index){
            element.children[2].children[1].classList.remove('fa-circle-play');
            element.children[2].children[1].classList.add('fa-circle-pause');
        }
    })
    allSongArray[index].classList.remove('fa-circle-play');
    allSongArray[index].classList.add('fa-circle-pause');
    clicked(index);
})

document.body.addEventListener('keydown', (e)=>{
    if(e.code=='ArrowLeft'){
        if(allSongArray[index].classList.contains('fa-circle-pause')==true)
        {
            allSongArray[index].classList.remove('fa-circle-pause');
            allSongArray[index].classList.add('fa-circle-play');
        }
        playlistContent.forEach((element)=>{
            if(element.id.split('-')[2]-1==index){
                element.children[2].children[1].classList.remove('fa-circle-pause');
                element.children[2].children[1].classList.add('fa-circle-play');
            }
        })
        index--;
        if(index<0) index=songsInfo.length-1;
        playlistContent.forEach((element)=>{
            if(element.id.split('-')[2]-1==index){
                element.children[2].children[1].classList.remove('fa-circle-play');
                element.children[2].children[1].classList.add('fa-circle-pause');
            }
        })
        allSongArray[index].classList.remove('fa-circle-play');
        allSongArray[index].classList.add('fa-circle-pause');
        clicked(index);
    }
});
document.body.addEventListener('keydown', (e)=>{    
    if(e.code=='ArrowRight'){
        if(allSongArray[index].classList.contains('fa-circle-pause')==true)
        {
            allSongArray[index].classList.remove('fa-circle-pause');
            allSongArray[index].classList.add('fa-circle-play');
        }
        playlistContent.forEach((element)=>{
            if(element.id.split('-')[2]-1==index){
                element.children[2].children[1].classList.remove('fa-circle-pause');
                element.children[2].children[1].classList.add('fa-circle-play');
            }
        })
        index++;
        index=index%songsInfo.length;
        playlistContent.forEach((element)=>{
            if(element.id.split('-')[2]-1==index){
                element.children[2].children[1].classList.remove('fa-circle-play');
                element.children[2].children[1].classList.add('fa-circle-pause');
            }
        })
        allSongArray[index].classList.remove('fa-circle-play');
        allSongArray[index].classList.add('fa-circle-pause');
        clicked(index);
    }
});

document.querySelector('#range-bar').addEventListener('input',()=>{
    currSong.currentTime=document.querySelector('#range-bar').value*currSong.duration/100;
});

currSong.addEventListener('timeupdate',()=>{
    document.querySelector('#range-bar').value=(currSong.currentTime/currSong.duration)*100;
});
document.querySelector('#songName').innerHTML=songsInfo[index].name;
// song clicked

allSongArray.forEach((element,i)=>{
    element.addEventListener('click',()=>{
        if(element.classList.contains('fa-circle-pause')==true)
        {
            currSong.pause();
            playlistContent.forEach((element)=>{
                if(element.id.split('-')[2]-1==index){
                    element.children[2].children[1].classList.remove('fa-circle-pause');
                    element.children[2].children[1].classList.add('fa-circle-play');
                }
            })
            document.querySelector("#masterPlay").classList.remove('fa-circle-pause');
            document.querySelector("#masterPlay").classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
        else if(i==index){
            currSong.play();
            playlistContent.forEach((element)=>{
                if(element.id.split('-')[2]-1==index){
                    element.children[2].children[1].classList.remove('fa-circle-play');
                    element.children[2].children[1].classList.add('fa-circle-pause');
                }
            })
            document.querySelector("#masterPlay").classList.remove('fa-circle-play');
            document.querySelector("#masterPlay").classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
        else{
            if(allSongArray[index].classList.contains('fa-circle-pause')==true)
            {
                allSongArray[index].classList.remove('fa-circle-pause');
                allSongArray[index].classList.add('fa-circle-play');
            }
            clicked(i);
            playlistContent.forEach((element)=>{
                if(element.id.split('-')[2]-1==index){
                    element.children[2].children[1].classList.remove('fa-circle-play');
                    element.children[2].children[1].classList.add('fa-circle-pause');
                }
            })
            document.querySelector("#masterPlay").classList.remove('fa-circle-play');
            document.querySelector("#masterPlay").classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
    })
})

function clicked(ind){
    currSong.pause();
    index=ind;
    document.querySelector('#range-bar').value=0;
    document.querySelector('#songName').innerHTML=songsInfo[index].name;
    currSong=new Audio(songsInfo[index].path);
    currSong.currentTime=0;
    currSong.addEventListener('timeupdate',()=>{
        document.querySelector('#range-bar').value=(currSong.currentTime/currSong.duration)*100;
    });
    if(document.querySelector("#masterPlay").classList.contains('fa-circle-pause')==true)
    {
        document.querySelector("#masterPlay").classList.remove('fa-circle-pause');
        document.querySelector("#masterPlay").classList.add('fa-circle-play');
    }
    currSong.play();
    document.querySelector("#masterPlay").classList.remove('fa-circle-play');
    document.querySelector("#masterPlay").classList.add('fa-circle-pause');
}

// playlist section

let playlistSong=document.querySelector('#playlist-song');
document.querySelectorAll('#addButton').forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        // console.log(element);
        if(element.classList.contains('fa-plus')){
            element.classList.remove('fa-plus');
            element.classList.add('fa-check');
            playlistSong.innerHTML+=`
            <div class="playlist-item" id="list-item-${1+i}">
                <img src="${songsInfo[i].img}" alt="cover-2">
                <p>${songsInfo[i].name}</p>
                <div>
                    <i class="fa-solid fa-trash ${1+i}" id="trash-button" style="color: #f4f4f4;"></i>
                    <i class="fa-solid fa-circle-play" id="playList-playButton" style="color: #f4f4f4;"></i>
                </div>
            </div>
            `;
            playlistContent=document.querySelectorAll('.playlist-item');
            document.querySelectorAll("#trash-button").forEach((element,i)=>{
                element.addEventListener('click',(e)=>{
                    // console.log(e.target.parentElement.parentElement.id);
                    document.querySelector(`#${e.target.parentElement.parentElement.id}`).remove();
                    document.querySelector(`.addButton-${e.target.classList[2]}`).classList.add('fa-plus');
                    document.querySelector(`.addButton-${e.target.classList[2]}`).classList.remove('fa-check');
                })
            })
            playlistContent.forEach((element)=>{
                // console.log(element.children[2].children[1]);
                let i=element.id.split('-')[2]-1;
                element.children[2].children[1].addEventListener('click',()=>{
                    if(element.children[2].children[1].classList.contains('fa-circle-pause')==true)
                    {
                        currSong.pause();
                        allSongArray[index].classList.remove('fa-circle-pause');
                        allSongArray[index].classList.add('fa-circle-play');
                        document.querySelector("#masterPlay").classList.remove('fa-circle-pause');
                        document.querySelector("#masterPlay").classList.add('fa-circle-play');
                        element.children[2].children[1].classList.remove('fa-circle-pause');
                        element.children[2].children[1].classList.add('fa-circle-play');
                    }
                    else if(i==index){
                        currSong.play();
                        allSongArray[index].classList.remove('fa-circle-play');
                        allSongArray[index].classList.add('fa-circle-pause');
                        document.querySelector("#masterPlay").classList.remove('fa-circle-play');
                        document.querySelector("#masterPlay").classList.add('fa-circle-pause');
                        element.children[2].children[1].classList.remove('fa-circle-play');
                        element.children[2].children[1].classList.add('fa-circle-pause');
                    }
                    else{
                        index=i;
                        allSongArray[index].classList.remove('fa-circle-play');
                        allSongArray[index].classList.add('fa-circle-pause');
                        document.querySelector("#masterPlay").classList.remove('fa-circle-play');
                        document.querySelector("#masterPlay").classList.add('fa-circle-pause');
                        element.children[2].children[1].classList.remove('fa-circle-play');
                        element.children[2].children[1].classList.add('fa-circle-pause');
                        clicked(i);
                    }
                })
            })
        }
    })
})
