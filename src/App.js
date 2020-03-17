import React, {useState, useEffect} from 'react';
import './App.css';

function App(props) {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState("")

  var queryString = category ? "q=" + category + "&" : ""
  var userDefault = 'http://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=886b63931cdf4e95bbde58840ef289c2';
  var userSearch = 'http://newsapi.org/v2/everything?' + queryString +
  'apiKey=886b63931cdf4e95bbde58840ef289c2';

  function getNews(urlParam){
    fetch(urlParam)
    .then(response => response.json())
    .then(data => setArticles(data.articles));
  }

  useEffect(()=>getNews(userDefault), [])
  return (
    <div className="App">
      <h1>World News</h1>
      <p>Enter the topic of interest here:</p>
      <input name="" id="topic" onChange={(event) => setCategory(event.target.value)
        }></input>
      <button onClick={() => getNews(userSearch)}>Submit</button>
      <div>
        {articles.map((item, index) => (
          <div key={index} className="newsCard">
            {item.title}
            <p>{item.description}</p>
            <p>{item.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
