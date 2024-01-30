import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [url, setUrl] = useState("");
  const [thumb, setThumb] = useState("");
  const [title, setTitle] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setloading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault()
    setloading(true)
    setTitle("")
    try {
      const res = await axios.post("http://localhost:4000/download", { vidUrl: url })
      console.log(res.data)
      setloading(false)
      setTitle(res.data[0].title)
      setThumb(res.data[0].thumb)
      setDownloadUrl(res.data[0].url)

    } catch (error) {
      console.log(error)
    }
  }

  const handleMore = () => {
    setTitle("")
    setUrl("")
  }

  return (
    <div className="App">
      <nav>
        <h2>PRIYANSHU_07804'S WEB</h2>
      </nav>

      <div className="conta">
        <div className="ancor">
          <span>Video</span>
          <span>Photo</span>
          <span>Story</span>
          <span>Reel</span>
        </div>
        <div className="input-box">
          <div>
            <h1>Instagram Video Download</h1>
            <p>Download Video Instagram, Photo, Reels, Stories Online</p>
          </div>

          <form onSubmit={handleClick} className="input">

            <input type="text" required placeholder="Paste Video URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type='submit'>Download</button>
          </form>
        </div>
      </div>

      {loading && <h3>Loading...</h3>}

      {title && <div className='details'>
        <img className='img' src={thumb} alt="" />
        <div className='column'>
          <p className='title'>{title}</p>
          <a href={downloadUrl}>Download</a>
        </div>
      </div>}

      {title && <button className='more' onClick={handleMore}>Download Another</button>}

    </div>
  );
}

export default App;
