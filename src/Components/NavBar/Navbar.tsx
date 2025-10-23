import { NavLink } from "react-router-dom"
import "./NavBar.css"
export function Navbar() {
    

    return (
        <div className="navbar">
            <h1>Blog Management</h1>
            <nav>
            <ul className='navbar-list'>
                <li><NavLink to="/">TRang chủ</NavLink></li>
                <li><NavLink to="/create">Tạo bài</NavLink></li>
                <li><NavLink to="/post/:id">Chi tiết</NavLink></li>
                <li><NavLink to="/posts/edit/:id">Sửa</NavLink></li>
            </ul>
            </nav>

        </div>
    )
        
    }

