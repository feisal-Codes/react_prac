import { useState } from "react";
import songs from "./data";
import SongLists from "./songList";
import PlayerControls from "./playerControls";
import CurrentSong from "./currentSong";
const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState("");
  const [togglePlay, setTogglePlay] = useState("play");
  const [songsList, setSongsList] = useState(songs);
  console.log(currentSong);
  const handlePlay = () => {
    if (!currentSong) {
      let playingSong = songsList[0];
      playingSong.status = "playing";
      let updatedSongs = [playingSong, ...songs.slice(1)];
      setCurrentSong(playingSong);
      setSongsList(updatedSongs);
    } else {
      setCurrentSong((prev) => {
        if (prev.status === "paused" || prev.status === "not playing") {
          return { ...prev, status: "playing" };
        }
      });
    }
    setTogglePlay("pause");
  };

  const handleNext = (playList) => {
    let lastIndex = songsList.length - 1;
    //get index of song whose id is in the current song
    if (currentSong) {
      setTogglePlay("pause");

      let currSongIndex = playList.findIndex(
        (song) => song.id === currentSong.id
      );
      if (currSongIndex + 1 <= lastIndex) {
        let oldSong = playList[currSongIndex];
        oldSong.status = "not playing";
        let newSong = {};
        newSong = playList[currSongIndex + 1];
        newSong.status = "playing";
        setCurrentSong(() => newSong);
      }
    }
  };

  const handlePrev = (playList) => {
    let firstIndex = 0;
    //get index of song whose id is in the current song
    if (currentSong) {
      setTogglePlay("pause");
      let currSongIndex = playList.findIndex(
        (song) => song.id === currentSong.id
      );
      if (currSongIndex - 1 >= firstIndex) {
        let oldSong = playList[currSongIndex];
        oldSong.status = "not playing";
        let newSong = {};
        newSong = playList[currSongIndex - 1];
        newSong.status = "playing";
        setCurrentSong(() => newSong);
      }
    }
  };

  const handlePause = () => {
    setCurrentSong((prev) => ({
      ...prev,
      status: "paused",
    }));
    setTogglePlay("play");
  };

  const handleClick = (control) => {
    let playList = [...songsList];

    // check if any song is playing
    if (control === "play") {
      handlePlay();
    } else if (
      control === "pause" &&
      currentSong &&
      currentSong.status === "playing"
    ) {
      handlePause();
    } else if (control === "next" && currentSong) {
      handleNext(playList);
    } else if (control === "prev" && currentSong) {
      handlePrev(playList);
    }
  };
  return (
    <>
      <div>
        <h3>Currently playing</h3>
        <CurrentSong song={currentSong} />
      </div>
      <div>
        <PlayerControls handleClick={handleClick} toggle={togglePlay} />
      </div>
      <div>
        <SongLists songs={songsList} />
      </div>
    </>
  );
};

export default MusicPlayer;
