const audioPlayer = document.getElementById('audioPlayer');
const fileInput = document.getElementById('fileInput');
const addSongBtn = document.getElementById('addSongBtn');
const playlist = document.getElementById('playlist');

addSongBtn.addEventListener('click', function() {
  fileInput.click();
});

fileInput.addEventListener('change', function() {
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.includes('audio')) {
      addSongToPlaylist(file);
    } else {
      console.error('Formato de archivo no compatible');
    }
  }
});

function addSongToPlaylist(file) {
  const newSource = document.createElement('source');
  newSource.src = URL.createObjectURL(file);
  newSource.type = file.type;

  const newSong = document.createElement('li');
  const songName = document.createTextNode(file.name);
  newSong.appendChild(songName);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Eliminar';
  deleteButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Evitar que el clic se propague al elemento li
    playlist.removeChild(newSong);

    if (audioPlayer.src === newSource.src) {
      audioPlayer.pause();
      audioPlayer.removeAttribute('src');
    }
  });

  newSong.addEventListener('click', function() {
    audioPlayer.src = newSource.src;
    audioPlayer.load();
    audioPlayer.play();
  });

  newSong.appendChild(deleteButton);
  playlist.appendChild(newSong);
}
