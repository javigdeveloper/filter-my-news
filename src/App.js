import React, {useState, useEffect} from 'react';
import './App.css';

function App(props) {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState("")

  var queryString = category ? "q=" + category + "&" + "from=" + document.getElementById("myDate").value : ""
  var userDefault = 'http://newsapi.org/v2/top-headlines?' + 'country=us';
  var userSearch = 'http://newsapi.org/v2/everything?' + queryString

  function getNews(urlParam){
    var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "886b63931cdf4e95bbde58840ef289c2");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(urlParam, requestOptions)
      .then(response => response.json())
      .then(data => setArticles(data.articles))
      .catch(error => console.log('error', error));
  }

  function hitEnter (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("myBtn").click();
    }
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var lm = "";
  (mm != "01") ? lm = String(today.getMonth()).padStart(2, '0') : lm = "12";
  var tm = "";
  (dd == "28" || dd == "29" || dd == "30" || dd == "31") ? tm = "01" : tm = String(today.getDate() + 1).padStart(2, '0');
  (dd == "28" || dd == "29" || dd == "30" || dd == "31") ? lm = mm : lm = String(today.getMonth()).padStart(2, '0');
  
  today = yyyy + '-' + mm + '-' + dd;
  var monthAgo = yyyy + '-' + lm + '-' + tm;

  useEffect(()=>getNews(userDefault), [])

  window.onscroll = function() {myFunction()};

  function myFunction() {
    var navbar = document.getElementById("instructions");
    var sticky = navbar.offsetTop;
    if (window.pageYOffset > sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }

  return (
    <div className="App">
      <h1 className="header">World News Finder</h1>
      <div id="instructions">
        <p className="prompt">Topic of interest:</p>
        <input id="myTopic" onKeyUp={(event) => hitEnter(event)} onChange={(event) => setCategory(event.target.value)
          }></input>
        <p className="prompt">Date:</p>
        <input type="date" id="myDate" min={monthAgo} max={today} ></input>
        <button id="myBtn" onClick={() => getNews(userSearch)}>Search</button>
      </div>
      <div className="content">
        {articles.map((item, index) => (
          <div key={index} className="newsCard">
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <img className="cardImage" src={item.urlToImage} />
            <p>To display the full story <a href={item.url} className="link">click here</a></p>
            <p className="published">{item.publishedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
