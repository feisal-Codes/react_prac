const CurrentSong = ({ song }) => {
  return (
    <>
      {song ? (
        <p>
          <i>
            {song.title}

            {" by " + song.artist + " is "}
            {song.status}
          </i>
        </p>
      ) : (
        <p>
          <i>No song is playing </i>
        </p>
      )}
    </>
  );
};

export default CurrentSong;
