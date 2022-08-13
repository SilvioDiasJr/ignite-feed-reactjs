import React from 'react'

import { IPostDTO } from './dtos/postsDTO'

import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Post } from './components/Post'

import styles from './App.module.css'

const data: IPostDTO[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/silviodiasjr.png',
      name: 'Silvio Dias',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      { type: 'link', content: '👉 jane.design/doctorcare' }
    ],
    publishedAt: new Date('2022-08-09 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/silviodiasjr.png',
      name: 'Viviane Birello',
      role: 'Veterinary'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      { type: 'link', content: '👉 jane.design/doctorcare' }
    ],
    publishedAt: new Date('2022-08-11 10:00:00')
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {data.map(item => (
            <Post key={item.id} data={item} />
          ))}
        </main>
      </div>
    </div>
  )
}
