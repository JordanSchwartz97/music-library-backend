const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const app = express();

app.listen(5000,function (){
    console.log("Server started. Listening on port 5000.")
});

app.get('/api/songs',(req, res) =>{
   const allSongs = repoContext.songs.findAllSongs();
   return res.send(allSongs);
});

app.get('/api/songs/:id',(req, res) => {
    const id = req.params.id;
    const singleSong = repoContext.songs.findSongById(id);
    return res.send(singleSong);
})