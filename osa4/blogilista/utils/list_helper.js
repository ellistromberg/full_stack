const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return Math.max(max.likes, item.likes) === max.likes
      ? max
      : item
  }
  const favorite = blogs.reduce(reducer, blogs[0])
  return blogs.length === 0
    ? ""
    : favorite.title
}

const mostBlogs = (blogs) => {
  const blogsPerAuthor = []
  
  blogs.forEach(blog => {
    const existingAuthor = blogsPerAuthor.find(author => author.author === blog.author)
    if (existingAuthor) {
      existingAuthor.blogs += 1
    } else {
        const newAuthor = {
            author: blog.author,
            blogs: 1
        }
        blogsPerAuthor.push(newAuthor)
    }
  })

  const reducer = (max, author) => {
    return Math.max(max.blogs, author.blogs) === max.blogs
      ? max
      : author
  }

  const withMostBlogs = blogsPerAuthor.reduce(reducer, blogsPerAuthor[0])
  return blogs.length === 0
    ? ""
    : {
        author: withMostBlogs.author,
        blogs: withMostBlogs.blogs
      }
}

const mostLikes = (blogs) => {
    const likesPerAuthor = []
  
  blogs.forEach(blog => {
    const existingAuthor = likesPerAuthor.find(author => author.author === blog.author)
    if (existingAuthor) {
      existingAuthor.likes += blog.likes
    } else {
        const newAuthor = {
            author: blog.author,
            likes: blog.likes
        }
        likesPerAuthor.push(newAuthor)
    }
  })

  const reducer = (max, author) => {
    return Math.max(max.likes, author.likes) === max.likes
      ? max
      : author
  }

  const withMostLikes = likesPerAuthor.reduce(reducer, likesPerAuthor[0])
  return blogs.length === 0
    ? ""
    : {
        author: withMostLikes.author,
        likes: withMostLikes.likes
      }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}