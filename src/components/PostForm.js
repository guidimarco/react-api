import React, {useState, useEffect} from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({posts, setPosts, editingPost, setEditingPost}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title)
      setBody(editingPost.body)
    } else {
      setTitle('')
      setBody('')
    }
  }, [editingPost])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingPost) editPost();
    else addPost();

    setTitle('')
    setBody('')
    setEditingPost(null)
  }

  const addPost = () => {
    createPost({title, body})
      .then(result => {
        setPosts([...posts, result.data])
      })
      .catch(error => {
        console.error(error)
      })
  }

  const editPost = () => {
    updatePost(editingPost.id, {title, body})
      .then(result => {
        setPosts(posts.map(post => post.id === editingPost.id ? result.data : post))
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)}></input>
        </div>
        <div>
          Body
          <textarea type="text" value={body} onChange={(ev) => setBody(ev.target.value)}></textarea>
        </div>
        <button type="submit">{editingPost ? 'Edit Post' : 'Add Post'}</button>
      </form>
    </div>
  )
}