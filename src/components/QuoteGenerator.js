import React, { useState, useEffect } from 'react';
import './StyledQuoteGenerator.css';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?`,
        {
          adapter: jsonpAdapter,
          callbackParamName: 'jsonp',
        }
      );

      setQuote(data.quoteText);
      setAuthor(data.quoteAuthor);
    } catch {
      setError("Couldn't load the new quote");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="main-container">
      <header className="header-title">
        <p>Random Quote Generator</p>
      </header>
      {error && <p className="error-msg">{error}</p>}
      {isLoading ? (
        <p>LOADING...</p>
      ) : (
        <div className="quote-container">
          <p>{quote}</p>
          {author ? <p className="styled-author">{author}</p> : null}

          <button className="btn-newQuote" onClick={handleClick}>
            New Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;
