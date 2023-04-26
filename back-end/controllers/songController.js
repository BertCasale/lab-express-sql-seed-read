const express = require("express");
const songs = express.Router();
const {getAllSongs, getOneSong, createSong} = require("../queries/songs.js");

songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();

  if (allSongs){
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({error: "Server Error"});
  }
});

songs.get("/:id", async (req, res) => {
  const {id} = req.params;
  const oneSong = await getOneSong(id); 

  if (oneSong) {
    res.status(200).send(oneSong);
  } else {
    res.status(500).json({error: "Server Error"});
  }
});

songs.post("/", async (req, res) => {
  const newSong = req.body;

  try {
    const addedSong = await createSong(newSong);

    res.status(202).json(addedSong);
  } catch (error) {
    res.status(400).json({error: error});
  }
});

module.exports = songs;