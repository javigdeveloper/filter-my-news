import React, {useState, useEffect} from 'react';
import './App.css';

// function App() {
//   const [fact, setFact] = useState("")
//   function getNews(){
//     fetch("http:\/\/randomfox.ca\/images\/103.jpg")
//     .then(response => response.json())
//     // .then(data => setImage(data.file));
//   }
//   return (
//     <div className="App">
//       <h1>News</h1>
//       <p>{fact}</p>
//     </div>
//   );
// }

function App(props) {
  var apiUrl = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=886b63931cdf4e95bbde58840ef289c2';

  const [articles, setArticles] = useState([])
  
  function getNews(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => setArticles(data.articles));
  }

  async function getNewsAsync(){
    const promisesWithJSON = await fetch("https://randomfox.ca/floof/")
    const data = await promisesWithJSON.json()
    setArticles(data.articles);
  }

  useEffect(()=>getNews(), [])
  return (
    <div className="App">
      <h1>News</h1>
      <div>
      {articles.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}
    </div>
    </div>
  );
}

export default App;
