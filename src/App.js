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
  
  function hitEnter (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("myBtn").click();
    }
  }

  useEffect(()=>getNews(userDefault), [])
  return (
    <div className="App">
      <h1 className="header">World News Finder</h1>
      <p className="prompt">Enter the topic of interest here:</p>
      <input name="" id="topic" onKeyUp={(event) => hitEnter(event)} onChange={(event) => setCategory(event.target.value)
        }></input>
      <button id="myBtn" onClick={() => getNews(userSearch)}>Search</button>
      <div>
        {articles.map((item, index) => (
          <div key={index} className="newsCard">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <img className="cardImage" src={item.urlToImage} />
            <p>To display the full story <a href={item.url} className="link">click here</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
