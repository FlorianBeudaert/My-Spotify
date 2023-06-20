import "../style/App.css";
import logo from "../assets/logo.png"

import React, { useEffect, useState } from "react";
import "../style/App.css";

function Genre(){
  const [artistData, setArtistData] = useState('');
  const [id, setId] = useState('artist');
  const [input, setInput] = useState('');
  const [artistData2, setArtistData2] = useState('');
  const [artistData3, setArtistData3] = useState('');
  const [artistData4, setArtistData4] = useState('');
  const [artistData5, setArtistData5] = useState('');
  const [int, setInt] = useState(0)
  const [genre, setGenre] = useState(1)
  const [genredata, setGenreData] = useState('')
  const [page, setPage] = useState(1)
  
  
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/genres/${genre}`, {
      headers: {
        method: "GET",
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    setGenreData("")
    setGenreData(data.albums);

  };
  fetchData();
}, [id, input, int, genre]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/albums/`, {
        headers: {
          method: "GET",
          "content-type" : "application/json",
        },
      });
      const data = await response.json();
          if(genredata != ""){
            setArtistData(data[genredata[int] - 1])
            setArtistData2(data[genredata[int + 1] - 1])
            setArtistData3(data[genredata[int + 2] - 1])
            setArtistData4(data[genredata[int + 3] - 1])
            setArtistData5(data[genredata[int + 4] - 1])
          }
          
            
        }
        fetchData()
      }, [id, input, int, genre, genredata]
  )
return(
<>  
  <div className="last-next-btn">
    <div>
      <button className="home-link" onClick={() => {
        if(int >= 5){
          let i = int - 5;
          setInt(i)
        }
        if(page >= 1){
          
          let k = page - 1
        

        
        setPage(k)
        }
      }}>Page Précédente</button>
    </div>
    <div>
      <button className="home-link" onClick={() => {
        
          let i = int + 5;
          setInt(i)
          if(page === undefined){
            let page = 1
          }
          let k = page + 1
        

        
        setPage(k)
      }}>Page suivante</button>
    </div>
  </div>
<div className="center">
<select onChange={(e) => {setGenre(e.target.value)
setInt(0)
setPage(0)}}>
  <option value="1">Classical</option>
  <option value="2">New Age</option>
  <option value="3">Electronica</option>
  <option value="4">World</option>
  <option value="5">Ambient</option>
  <option value="6">Jazz</option>
  <option value="7">Hip Hop</option>
  <option value="8">Alt Rock</option>
  <option value="9">Electro Rock</option>
  <option value="10">Hard Rock</option>

</select>

</div>
<div className="center search-result">
  <p>{page}</p>
  {<p>{artistData.name}</p>}
  {<img src={artistData.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData.description}</p>}
  <br/>
  {<p>{artistData2.name}</p>}
  {<img src={artistData2.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData2.description}</p>}
  <br/>
  {<p>{artistData3.name}</p>}
  {<img src={artistData3.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData3.description}</p>}
  <br/>
  {<p>{artistData4.name}</p>}
  {<img src={artistData4.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData4.description}</p>}
  <br/>
  {<p>{artistData5.name}</p>}
  {<img src={artistData5.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData5.description}</p>}
</div>
</>
)

}

function Album(){
  const [artistData, setArtistData] = useState('');
  const [id, setId] = useState('artist');
  const [input, setInput] = useState('');
  const [artistData2, setArtistData2] = useState('');
  const [artistData3, setArtistData3] = useState('');
  const [artistData4, setArtistData4] = useState('');
  const [artistData5, setArtistData5] = useState('');
   const [int, setInt] = useState(0)
  const [album, setAlbum] = useState('');
  const [albums, setAlbums] = useState([]);
  const [albumid, setAlbumid] = useState(100);
  const [display, setDisplay] = useState('none');
  let AlbArray = [];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/albums/${albumid}`, {
        headers: {
          method: "GET",
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setAlbum(data);
      setAlbums(data.tracks);
    
    };
    fetchData();
  }, [albumid]);
  function Albumlist() {
    return (
      <div>
        
        <div>
        <button onClick={() => {setDisplay('')}}>Back to albums</button>
          
        </div>
        {album && (
          <div>
            <h2>{album.album.name}</h2>
            {album.tracks && (
              <ul>
                {album.tracks.map((track) => (
                  <li key={track.id}>
                    {track.name}
                    <Launch music={new Audio(track.mp3)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
  
  function Launch({ music }) {
    const [playing, setPlaying] = useState(false);
    const [MusicPlayed, setMusicPlayed] = useState('');
   
      

    const togglePlay = () => {
      if(MusicPlayed !== music && MusicPlayed !== ''){
        MusicPlayed.pause()
        setMusicPlayed(music);
      }
      if (playing) {
        music.pause();
      } else {
        music.play();
      }
      setPlaying(!playing);
    };
  
    let buttonStatus;
    if (playing) {
      buttonStatus = "Pause";
    } else {
      buttonStatus = "Play";
    }
  
    return <button onClick={togglePlay}>{buttonStatus}</button>;
  }
  
  
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/search?query=&type=album`, {
      headers: {
        method: "GET",
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    

    for(let i = 0; i < data.albums.length; i++){
      if(data.albums[i].name.substring(0, input.length) == input && input != "") {
        AlbArray.push(data.albums[i])
        console.log(data.albums[i])
      }
    } 
    console.log(AlbArray)
    setArtistData(AlbArray[int])
      if(AlbArray[int + 1] != undefined){
        setArtistData2(AlbArray[int + 1])
      }
      if(AlbArray[int + 2] != undefined){
        setArtistData3(AlbArray[int + 2])
      }
      if(AlbArray[int + 3] != undefined){
        setArtistData4(AlbArray[int + 3])
      }
      if(AlbArray[int + 4] != undefined){
        setArtistData5(AlbArray[int + 4])
      }
    if(input == ""){
      setArtistData("")
      setArtistData2("")
      setArtistData3("")
      setArtistData4("")
      setArtistData5("")
    }
      
     
  };
  fetchData();
}, [id, input, int]);

function artistDataDisplay(){
  return (
    <div className="center search-result">
  {<a onClick={(e) =>{
    setAlbumid(artistData.id)
    setDisplay("album")
  }}>{artistData.name}</a>}
  {<img src={artistData.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData.description}</p>}
  <br/>
  {<a onClick={(e) =>{
    setAlbumid(artistData2.id)
    setDisplay("album")
  }}>{artistData2.name}</a>}
  {<img src={artistData2.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData2.description}</p>}
  <br/>
  {<a onClick={(e) =>{
    setAlbumid(artistData3.id)
    setDisplay("album")
  }}>{artistData3.name}</a>}
  {<img src={artistData3.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData3.description}</p>}
  <br/>
  {<a onClick={(e) =>{
    setAlbumid(artistData4.id)
    setDisplay("album")
  }}>{artistData4.name}</a>}
  {<img src={artistData4.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData4.description}</p>}
  <br/>
  {<a onClick={(e) =>{
    setAlbumid(artistData5.id)
    setDisplay("album")
  }}>{artistData5.name}</a>}
  {<img src={artistData5.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData5.description}</p>}
</div>
  )
}
if(display == "album"){
  return(
    <div>
      <Albumlist />
    </div>
  )
}

return(
<>  
  <div className="last-next-btn">
    <div>
      <button className="home-link" onClick={() => {
        let i = int - 5;
        setInt(i)
      }}>Page Précédente</button>
    </div>
    <div>
      <button className="home-link" onClick={() => {
        let i = int + 5;
        setInt(i)
      }}>Page suivante</button>
    </div>
  </div>
<div className="center">
<input className="margin-top-30" type="text" onChange={(e) => {setInput(e.target.value) 
setInt(0)
}} placeholder="Recherche"/>
</div>
{artistData ? artistDataDisplay() : <div className="center">Aucun résultat</div> }

</>
)
}


function Artist(){
    const [artistData, setArtistData] = useState('');
    const [id, setId] = useState('artist');
    const [input, setInput] = useState('');
    const [artistData2, setArtistData2] = useState('');
    const [artistData3, setArtistData3] = useState('');
    const [artistData4, setArtistData4] = useState('');
    const [artistData5, setArtistData5] = useState('');
    const [int, setInt] = useState(0)
    
    
    useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/search?query=&type=artist`, {
        headers: {
          method: "GET",
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      for(let i = 0; i < data.artists.length; i++){
        if(data.artists[i].name.substring(0, input.length) == input && input != "") {
          setArtistData(data.artists[i + int])
          if(data.artists[i + int + 1] != undefined){
            setArtistData2(data.artists[i + int + 1])
          }
          if(data.artists[i + int + 2] != undefined){
            setArtistData3(data.artists[i + int + 2])
          }
          if(data.artists[i + int + 3] != undefined){
            setArtistData4(data.artists[i + int + 3])
          }
          if(data.artists[i + int + 4] != undefined){
            setArtistData5(data.artists[i + int + 4])
          }
          
          
        }
      } 
      if(input == ""){
        setArtistData("")
        setArtistData2("")
        setArtistData3("")
        setArtistData4("")
        setArtistData5("")
      }
        
    
    };
    fetchData();
  }, [id, input, int]);
  return(
  <>
    <div className="last-next-btn">
      <div>
        <button className="home-link" onClick={() => {
          let i = int - 5;
          setInt(i)
        }}>Page Précédente</button>
      </div>
      <div>
        <button className="home-link" onClick={() => {
          let i = int + 5;
          setInt(i)
        }}>Page suivante</button>
      </div>
    </div>
  <div className="center">
  <input className="margin-top-30" type="text" onChange={(e) => {setInput(e.target.value) 
  setInt(0)
  }} placeholder="Recherche" />
  </div>
  <div className="center search-result">
    {<p>{artistData.name}</p>}
    {<img src={artistData.photo} alt={artistData.name}></img>}
    {<p className="text-md">{artistData.bio}</p>}
    <br/>
    {<p>{artistData2.name}</p>}
    {<img src={artistData2.photo} alt={artistData.name}></img>}
    {<p className="text-md">{artistData2.bio}</p>}
    <br/>
    {<p>{artistData3.name}</p>}
    {<img src={artistData3.photo} alt={artistData.name}></img>}
    {<p className="text-md">{artistData3.bio}</p>}
    <br/>
    {<p>{artistData4.name}</p>}
    {<img src={artistData4.photo} alt={artistData.name}></img>}
    {<p className="text-md">{artistData4.bio}</p>}
    <br/>
    {<p>{artistData5.name}</p>}
    {<img src={artistData5.photo} alt={artistData.name}></img>}
    {<p className="text-md">{artistData5.bio}</p>}
  </div>
  </>
  )
}
function RandomAlbum(){
  const [state, setState] = useState('');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch('http://localhost:8000/albums');
      const data = await response.json();
      const randomAlbums = chooseRandomAlbums(data, 10);
      setAlbums(randomAlbums);
    };
    fetchAlbums();
  }, []);

  const chooseRandomAlbums = (array, n) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  const handleClick = (album) => {
    setState(album);
  }

  const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = 'scale(1.1)';
  }

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  }

  return(
    <div className="albums-container">
      {state && (
        <div className="modal">
          <img src={state.cover} alt={state.name}/>
          <h3>{state.name}</h3>
          <p>{state.artist}</p>
          <button onClick={() => setState('')}>Close</button>
        </div>
      )}
      {albums.map(album => (
        <div className="album" key={album.id} onClick={() => handleClick(album)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src={album.cover} alt={album.name}/>
          <h3>{album.name}</h3>
          <p>{album.artist}</p>
        </div>
      ))}
    </div>
  )
}
function DisplayAlbum(){
  const [artistData, setArtistData] = useState('');
  const [id, setId] = useState('artist');
  const [input, setInput] = useState('');
  const [artistData2, setArtistData2] = useState('');
  const [artistData3, setArtistData3] = useState('');
  const [artistData4, setArtistData4] = useState('');
  const [artistData5, setArtistData5] = useState('');
  const [int, setInt] = useState(0)
  
  
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/albums`, {
      headers: {
        method: "GET",
        "content-type": "application/json",
      },
    });
    const data = await response.json();
   
    setArtistData(data[int])
    if(data[int + 1] != undefined){
      setArtistData2(data[int + 1])
    }
    if(data[int + 2] != undefined){
      setArtistData3(data[int + 2])
    }
    if(data[int + 3] != undefined){
      setArtistData4(data[int + 3])
    }
    if(data[int + 4] != undefined){
      setArtistData5(data[int + 4])
    }
  };
  fetchData();
}, [id, input, int, artistData, artistData2, artistData3, artistData4, artistData5]);
return(
<>  
  <div className="last-next-btn">
    <div>
      <button className="home-link" onClick={() => {
        let i = int - 5;
        setInt(i)
      }}>Page Précédente</button>
    </div>
    <div>
      <button className="home-link" onClick={() => {
        let i = int + 5;
        setInt(i)
      }}>Page suivante</button>
    </div>
  </div>
<div className="center search-result">
  {<p>{artistData.name}</p>}
  {<img src={artistData.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData.description}</p>}
  <br/>
  {<p>{artistData2.name}</p>}
  {<img src={artistData2.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData2.description}</p>}
  <br/>
  {<p>{artistData3.name}</p>}
  {<img src={artistData3.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData3.description}</p>}
  <br/>
  {<p>{artistData4.name}</p>}
  {<img src={artistData4.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData4.description}</p>}
  <br/>
  {<p>{artistData5.name}</p>}
  {<img src={artistData5.cover} alt={artistData.name}></img>}
  {<p className="text-md">{artistData5.description}</p>}
</div>
</>
)
}
function DisplayArtists(){
  const [artistData, setArtistData] = useState('');
  const [id, setId] = useState('artist');
  const [input, setInput] = useState('');
  const [artistData2, setArtistData2] = useState('');
  const [artistData3, setArtistData3] = useState('');
  const [artistData4, setArtistData4] = useState('');
  const [artistData5, setArtistData5] = useState('');
  const [int, setInt] = useState(0)
  
  
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/artists`, {
      headers: {
        method: "GET",
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    setArtistData(data[int])
    if(data[int + 1] != undefined){
      setArtistData2(data[int + 1])
    }
    if(data[int + 2] != undefined){
      setArtistData3(data[int + 2])
    }
    if(data[int + 3] != undefined){
      setArtistData4(data[int + 3])
    }
    if(data[int + 4] != undefined){
      setArtistData5(data[int + 4])
    }
  };
  fetchData();
}, [id, input, int, artistData, artistData2, artistData3, artistData4, artistData5]);
return(
<>  
  <div className="last-next-btn">
    <div>
      <button className="home-link" onClick={() => {
        let i = int - 5;
        setInt(i)
      }}>Page Précédente</button>
    </div>
    <div>
      <button className="home-link" onClick={() => {
        let i = int + 5;
        setInt(i)
      }}>Page suivante</button>
    </div>
  </div>
<div className="center search-result">
  {<p>{artistData.name}</p>}
  {<img src={artistData.photo} alt={artistData.name}></img>}
  {<p className="text-md">{artistData.description}</p>}
  <br/>
  {<p>{artistData2.name}</p>}
  {<img src={artistData2.photo} alt={artistData.name}></img>}
  {<p className="text-md">{artistData2.description}</p>}
  <br/>
  {<p>{artistData3.name}</p>}
  {<img src={artistData3.photo} alt={artistData.name}></img>}
  {<p className="text-md">{artistData3.description}</p>}
  <br/>
  {<p>{artistData4.name}</p>}
  {<img src={artistData4.photo} alt={artistData.name}></img>}
  {<p className="text-md">{artistData4.description}</p>}
  <br/>
  {<p>{artistData5.name}</p>}
  {<img src={artistData5.photo} alt={artistData.name}></img>}
  {<p className="text-md">{artistData5.description}</p>}
</div>
</>
)
}

function Display() {
  const [id, setId] = useState('');
  
return (
  <div>
  <div className="navbar">
    <div className="logo">
      <img src={logo} alt="Logo Soundify"/>
      <h1>Soundify</h1>
    </div>
    <div className="search-bar">
    <select onChange={e => setId(e.target.value) } id="selected">
      <option value="">Accueil</option>
      <option value="albums">Recherche Album</option>
      <option value="genres">Recherche Genre</option>
      <option value="artist">Recherche Artiste</option>
      <option value="displayAlbum">Albums</option>
      <option value="displayArtists">Artistes</option>
    </select>
    </div>
  </div>
  {id=="" ? <RandomAlbum/> : null}
  {id == "artist" ? <Artist/> : null}
  {id == "albums" ? <Album/> : null}
  {id == "genres" ? <Genre/> : null}
  {id == "displayAlbum" ? <DisplayAlbum/> : null} 
  {id == "displayArtists" ? <DisplayArtists/> : null}
  </div>
);
}

function App() {
  return (
    <div className="App">
      <Display/>   
    </div>

  );
}

export default App;