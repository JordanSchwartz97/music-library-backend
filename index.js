const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const {validateSong} = require('./middleware/songs-validation');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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

app.post('/api/songs', [validateSong], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.send(addedSong);
});

app.put('/api/songs/:id', [validateSong], (req, res) => {
    const id = req.params.id;
    const songPropertiesToUpdate = req.body;
    const updatedSong = repoContext.songs.updateSong(id,songPropertiesToUpdate);
    return res.send(updatedSong)
    });