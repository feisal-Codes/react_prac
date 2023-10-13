const SongLists = ({ songs }) => {
  return (
    <>
      {songs.map((song) => (
        <div
          key={song.id}
          style={{
            borderBottom: "1px black solid",
          }}
        >
          <h4>{song.title}</h4>
          <p style={{ color: "#333" }}>by : {song.artist}</p>
        </div>
      ))}
    </>
  );
};

export default SongLists;
