import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Main = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL

  const [newsList, setNewsList] = useState([])
  const [keyword, setKeyword] = useState('김포')

  async function getNews() {
    const response = await axios.get(baseUrl + '/news', {
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
            <div key={index}>
              <a href={el.link}>
                <div dangerouslySetInnerHTML={{ __html: el.title }}></div>
              </a>
              <div dangerouslySetInnerHTML={{ __html: el.description }}></div>
            </div>
          )
        })}
    </div>
  )
}

export default Main
