import { Link } from "react-router-dom"
import "./NavBar.css"
export function Navbar() {
    

    return (
        <div className="navbar">
            <h1>Blog Management</h1>
            <nav>
            <ul className='navbar-list'>
                <li><Link to="/">TRang chủ</Link></li>
                <li><Link to="/create">Tạo bài</Link></li>
                <li><Link to="/post/:id">Chi tiết</Link></li>
                <li><Link to="/posts/edit/:id">Sửa</Link></li>
            </ul>
            </nav>

        </div>
    )
        
    }

