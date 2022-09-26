const musicPlayerWrapper = document.querySelector('.music-player-wrapper')

const prevBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')
const playBtn = document.querySelector('.play')

const audio = document.querySelector('audio')
const progress = document.querySelector('.progress-bar')
const progressWrapper = document.querySelector('.music-progress-wrapper')

const title = document.querySelector('.title')


const songsTitleArr = ['2tech-audio-corporate', '2tech-audio-event', '2tech-audio-happier', '2tech-audio-real-estate-2_0', '2tech-audio-technology']

let songIndex = 0

const loadSong = (song) => {
    audio.src = `audio/${song}.mp3`
    const songTitle = (song) => {
        let format1 = song.replace('2tech-audio-', '')
        let format2 = format1.replace(/[-]/g, ' ')
        let format3 = format2.replace('_', '.')
        let format4 = format3[0].toUpperCase()
        return format4 + format3.slice(1)
    }
    title.innerText = songTitle(song)
}

loadSong(songsTitleArr[songIndex])

const playSong = () => {
    musicPlayerWrapper.classList.add('play')
    document.querySelector('span.go').innerText = 'pause'
    audio.play() 
    document.querySelector('.music-details').style.animation = ''
}

const pauseSong = () => {
    musicPlayerWrapper.classList.remove('play')
    document.querySelector('span.go').innerText = 'play_arrow'
    audio.pause() 
    
    document.querySelector('.music-details').style.animation = 'flipExit 0.3s linear'
}

playBtn.addEventListener('click', () => {
    const playBool = musicPlayerWrapper.classList.contains('play')

    if (playBool) {
        pauseSong()
    } else {
        playSong()
    }
})

const previousSong = () => {
    songIndex--

    if (songIndex < 0) {
        songIndex = songsTitleArr.length - 1
    }

    loadSong(songsTitleArr[songIndex])
    playSong()

    musicPlayerWrapper.classList.add('previous')
    setTimeout(() => musicPlayerWrapper.classList.remove('previous'), 500)
}

const nextSong = () => {
    songIndex++

    if (songIndex > songsTitleArr.length - 1) {
        songIndex = 0
    }

    loadSong(songsTitleArr[songIndex])
    playSong()

    musicPlayerWrapper.classList.add('next')
    setTimeout(() => musicPlayerWrapper.classList.remove('next'), 500)
}

const updateProgress = (event) => {
    const {duration, currentTime} = event.srcElement;
    const progPct = (currentTime / duration) * 100
    progress.style.width = `${progPct}%`
}

function setProgress(event) {
    const width = this.clientWidth
    const clickX = event.offsetX
    const currentTimeStamp = audio.duration
    audio.currentTime = (clickX / width) * currentTimeStamp
    
}

prevBtn.addEventListener('click', previousSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressWrapper.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)
