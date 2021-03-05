import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Main = () => {
  const [newsList, setNewsList] = useState([])
  const [keyword, setKeyword] = useState('김포')

  async function getNews() {
    const response = await axios.get('http://localhost:8080/news', {
      params: {
        keyword: keyword,
      },
    })
    setNewsList(response.data.items.concat())
  }

  useEffect(() => {
    keyword && getNews()
  }, [])

  function onChange(e) {
    setKeyword(e.target.value)
  }

  function onKeyUp(e) {
    if (e.key === 'Enter') {
      getNews()
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={keyword}
      ></input>
      {newsList &&
        newsList.map((el, index) => {
          return (
            <>
              <a href={el.link} key={index}>
                <div dangerouslySetInnerHTML={{ __html: el.title }}></div>
              </a>
              <div dangerouslySetInnerHTML={{ __html: el.description }}></div>
            </>
          )
        })}
    </div>
  )
}

export default Main
