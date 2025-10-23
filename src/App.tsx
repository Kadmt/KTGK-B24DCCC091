import { Navbar } from './Components/NavBar/Navbar'
import './App.css'
import { PostList } from './Components/PostList/PostList'
import { PostForm } from './Components/PostForm/PostForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/create" element={<PostForm/>} />
        <Route path="/posts/:id" />
        <Route path="/posts/edit/:id" />
      </Routes>
    </BrowserRouter>
    
      
  )
}

export default App
