import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../URL'
import Head from './Head'
import NewsCard from './NewsCard'

export const News = () => {
    const [news, setNews] = useState({})

    useEffect(() => {
        axios.get(URL + 'news')
            .then(res => {
                setNews(res.data)
            })
            .catch(err => { console.log(err) })

        return () => {
            setNews()
        }
    }, [])

    console.log(news)

    return (
        <main id="home-container">
            <Head name='News' />
            {/* {
                news?.articles?.map(
                    (article) => <NewsCard id={article.link} />
                )
            } */}
            <NewsCard />
        </main>
    )
}
