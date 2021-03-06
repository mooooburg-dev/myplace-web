import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const NewsContainer = () => {
	const baseUrl = process.env.REACT_APP_BASE_URL

	const [newsList, setNewsList] = useState([])
	const [keyword, setKeyword] = useState('장소')
	const [keywords, setKeywords] = useState([])

	async function getNews(_keyword = null) {
		if (keyword) {
			const response = await axios.get(baseUrl + '/news', {
				params: {
					keyword: _keyword ? _keyword : keyword,
				},
			})
			setNewsList(response.data.items.concat())
			if (!keywords.includes(keyword)) setKeywords([...keywords, keyword])
		}
	}

	useEffect(() => {
		getNews()
	}, [])

	function onChange(e) {
		setKeyword(e.target.value)
	}

	function onKeyUp(e) {
		if (e.key === 'Enter') {
			getNews()
		}
	}

	function onClickConfirm() {
		getNews()
	}

	function onTagClick(tag) {
		setKeyword(tag)
		getNews(tag)
	}

	return (
		<div className="news-container">
			<div className="input-wapper">
				<input
					className="form input-place"
					type="text"
					onChange={onChange}
					onKeyUp={onKeyUp}
					value={keyword}></input>
				<button className="btn" onClick={onClickConfirm}>
					확인
				</button>
			</div>
			<div className="tag-wrapper">
				{keywords &&
					keywords.map((tag, index) => {
						return (
							<input
								className="btn btn-outline-primary btn-sm tag-keyword"
								key={index}
								value={tag}
								onClick={() => onTagClick(tag)}
								readOnly></input>
						)
					})}
			</div>
			{newsList &&
				newsList.map((el, index) => {
					return (
						<div key={index} className="news-item">
							<a href={el.originallink}>
								<div
									className="news-title"
									dangerouslySetInnerHTML={{ __html: el.title }}></div>
							</a>
							<div dangerouslySetInnerHTML={{ __html: el.description }}></div>
							<div>[{moment(el.pubDate).format('YYYY-MM-DD')}]</div>
						</div>
					)
				})}
		</div>
	)
}

export default NewsContainer
