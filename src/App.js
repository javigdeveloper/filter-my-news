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
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState("")

  // var apiUrl = 'http://newsapi.org/v2/top-headlines?' +
  //         'country=us&' +
  //         'apiKey=886b63931cdf4e95bbde58840ef289c2';
  // var userSearch = 'http://newsapi.org/v2/everything?' + "q=" + category + "&" +
  // 'apiKey=886b63931cdf4e95bbde58840ef289c2';

  var queryString = category ? "q=" + category + "&" : ""
  var userDefault = 'http://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=886b63931cdf4e95bbde58840ef289c2';
  var userSearch = 'http://newsapi.org/v2/everything?' + queryString +
  'apiKey=886b63931cdf4e95bbde58840ef289c2';

  function getNews(url){
    fetch(url)
    .then(response => response.json())
    .then(data => setArticles(data.articles));
  }

  useEffect(()=>getNews(userDefault), [])
  return (
    <div className="App">
      <h1>News</h1>
      <div>
        {articles.map((item, index) => (
          <p key={index} className="newsCard">{item.title}</p>
        ))}
      </div>
      <input name="" id="topic" onChange={(event) => setCategory(event.target.value)
      }></input>
      <button onClick={() => getNews(userSearch)}>Submit</button>
    </div>
  );
}

export default App;
