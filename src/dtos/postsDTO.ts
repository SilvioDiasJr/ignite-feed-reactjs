export interface IPostDTO {
  id: number
  author: {
    avatarUrl: string
    name: string
    role: string
  }
  content: {
    type: string
    content: string
  }[]

  publishedAt: Date
}

export interface ICommentDTO {
  content: string
  publishedAt: Date
}
