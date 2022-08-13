import React, { FormEvent, useState } from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'

import styles from './styles.module.css'
import { IPostDTO } from '../../dtos/postsDTO'

interface Props {
  data: IPostDTO
}

export const Post: React.FC<Props> = ({ data }) => {
  const [comments, setComments] = useState([
    {
      content: 'Post muito bacana, hein?!',
      publishedAt: new Date('Thu Aug 11 2022 18:16:03 GMT-0300')
    }
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(
    data.publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(data.publishedAt, {
    locale: ptBr,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    if (newCommentText === '') {
      return
    }
    console.log(newCommentText)

    const newComment = {
      content: newCommentText,
      publishedAt: new Date()
    }

    setComments([...comments, newComment])

    setNewCommentText('')
  }

  function handleNewCommentChange(value: string) {
    setNewCommentText(value)
  }

  function deleteComment(value: string) {
    setComments(comments.filter(item => item.content !== value))
  }

  const isNewCommentEmpty = newCommentText === ''

  return (
    <article className={styles.container}>
      <header>
        <div className={styles.author}>
          <Avatar src={data.author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{data.author.name}</strong>
            <span>{data.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={data.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {data.content.map(item => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>
          }
          if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href="">{item.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={event => handleNewCommentChange(event.target.value)}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(item => (
          <Comment
            key={item.content}
            data={item}
            onDeleteComment={event => deleteComment(event)}
          />
        ))}
      </div>
    </article>
  )
}
