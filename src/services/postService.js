import axios from "axios";

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const createPost = (post) => api.post('/posts', post )
const getPosts = () => api.get('/posts')
const updatePost = (id, post) => api.put(`/posts/${id}`, post)
const deletePost = (id) => api.delete(`/posts/${id}`)

export {createPost, getPosts, updatePost, deletePost};