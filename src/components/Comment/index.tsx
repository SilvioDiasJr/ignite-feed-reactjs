import React, { useState } from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from '../Avatar'

import styles from './styles.module.css'
import { ICommentDTO } from '../../dtos/postsDTO'

interface Props {
  data: ICommentDTO
  onDeleteComment(value: string): void
}

export const Comment: React.FC<Props> = ({ data, onDeleteComment }) => {
  const [likeCount, setLikeCount] = useState(0)

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

  function handleLikeComment() {
    setLikeCount(oldState => oldState + 1)
  }

  return (
    <div className={styles.container}>
      <Avatar borderless src="https://github.com/silviodiasjr.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Silvio Dias</strong>
              <time
                title={publishedDateFormatted}
                dateTime={data.publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button
              title="Deletar comentário"
              onClick={() => onDeleteComment(data.content)}
            >
              <Trash size={24} />
            </button>
          </header>

          <p>{data.content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
