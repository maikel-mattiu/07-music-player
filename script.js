const audio = document.querySelector("audio")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const artCover = document.querySelector("img")
const title = document.querySelector("#title")
const artist = document.querySelector("#artist")
const progessBar = document.querySelector(".progress-container")
const progress = document.querySelector(".progress")
const durationTime = document.querySelector("#duration")
const currentTimeElement = document.querySelector("#current-time")

//Songs details
const songs = [
	{
		name: "jacinto-1",
		displayName: "Electric Chill Machine",
		artist: "Jacinto Design"
	},
	{
		name: "jacinto-2",
		displayName: "Seven Nation Army (Remix)",
		artist: "Jacinto Design"
	},
	{
		name: "jacinto-3",
		displayName: "Goodnight, Disco Queen",
		artist: "Jacinto Design"
	},
	{
		name: "metric-1",
		displayName: "Front Row (Remix)",
		artist: "Metric/Jacinto Design"
	}
]

//Check if is playing
let isPlaying = false

// Current song index
let songIndex = 0

// Play controls
function togglePlay() {
	isPlaying = true
	playBtn.classList.replace("fa-play", "fa-pause")
	playBtn.setAttribute("title", "Play")
	audio.play()
}

function togglePause() {
	isPlaying = false
	playBtn.classList.replace("fa-pause", "fa-play")
	playBtn.setAttribute("title", "Pause")
	audio.pause()
}

function prevSong() {
	songIndex--
	if (songIndex < 0) {
		songIndex = songs.length - 1
	}
	loadSong(songs[songIndex])
	togglePlay()
}

function nextSong() {
	songIndex++
	if (songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSong(songs[songIndex])
	togglePlay()
}

//Convert time to minutes and seconds
function convertTime(seconds) {
	const minutes = Math.floor(seconds / 60)
	let remainingSeconds = Math.floor(seconds % 60)
	if (remainingSeconds < 10) {
		remainingSeconds = `0${remainingSeconds}`
	}
	return `${minutes}:${remainingSeconds}`
}

// Add songs to the list
function loadSong(song) {
	audio.src = `music/${song.name}.mp3`
	title.textContent = song.displayName
	artist.textContent = song.artist
	artCover.src = `img/${song.name}.jpg`
	audio.play()
}

function setProgress(event) {
	const width = this.clientWidth
	const clickX = event.offsetX
	const { duration } = audio
	const time = (clickX / width) * duration
	audio.currentTime = time
}

// Add Event Listeners
playBtn.addEventListener("click", () => {
	isPlaying ? togglePause() : togglePlay()
})

prevBtn.addEventListener("click", prevSong)

nextBtn.addEventListener("click", nextSong)

audio.addEventListener("ended", nextSong)

audio.addEventListener("timeupdate", () => {
	const { currentTime, duration } = audio
	const progressPercent = (currentTime / duration) * 100
	progress.style.width = `${progressPercent}%`
	durationTime.textContent = convertTime(duration)
	currentTimeElement.textContent = convertTime(currentTime)
})

progessBar.addEventListener("click", setProgress)
