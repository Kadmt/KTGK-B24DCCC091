import { PostCard } from "../PostCard/PostCard"
import "./PostList.css"
import type { PostCardProps } from "../PostCard/PostCard.module"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const PostList = () => {

    const initialPosts: PostCardProps[] = [
    {
        id: "1",
        title: "Khám phá React Hooks: useState và useEffect",
        author: "Anh Nguyễn",
        date: "2025-10-23",
        description:
        "Tìm hiểu sâu về hai hook cơ bản nhưng mạnh mẽ nhất trong React. Làm thế nào để quản lý state và xử lý side effects một cách hiệu quả.",
        poster: "https://picsum.photos/seed/react/600/400",
    },
    {
        id: "2",
        title: "10 Địa điểm không thể bỏ lỡ khi đến Kyoto, Nhật Bản",
        author: "Trần Văn Bình",
        date: "2025-10-21",
        description:
        "Kyoto, cố đô của Nhật Bản, nổi tiếng với những ngôi đền cổ kính, vườn thượng uyển và văn hóa geisha. Đây là 10 điểm đến bạn phải ghé thăm.",
        poster: "https://picsum.photos/seed/kyoto/600/400",
    },
    {
        id: "3",
        title: "Bí quyết làm việc tại nhà (Work From Home) hiệu quả",
        author: "Lê Thị Cẩm",
        date: "2025-10-20",
        description:
        "Làm việc từ xa đang trở thành xu hướng. Làm thế nào để duy trì năng suất, sự tập trung và cân bằng giữa công việc và cuộc sống?",
        poster: "https://picsum.photos/seed/workfromhome/600/400",
    },
    {
        id: "4",
        title: "Hướng dẫn nấu Phở Bò Hà Nội chuẩn vị",
        author: "Phạm Gia Hân",
        date: "2025-10-18",
        description:
        "Công thức gia truyền để có một bát phở bò Hà Nội thơm lừng, nước dùng trong vắt, đậm đà hương vị truyền thống ngay tại căn bếp của bạn.",
        poster: "https://picsum.photos/seed/pho/600/400",
    },
    {
        id: "5",
        title: "TypeScript có thực sự tốt hơn JavaScript?",
        author: "Vũ Đức Minh",
        date: "2025-10-15",
        description:
        "Một phân tích so sánh về lợi ích và hạn chế khi sử dụng TypeScript so với JavaScript thuần trong các dự án phát triển web hiện đại.",
        poster: "https://picsum.photos/seed/typescript/600/400",
    },
];
const navigate = useNavigate();
const [list, setList] = useState<PostCardProps[]>(initialPosts);
const handleDeletePost = (id: string) => {
    const updatedPosts = list.filter(post => post.id !== id);
    setList(updatedPosts);
}


    return (
        <>
        <div>
            <button onClick={() => navigate("/create")} className="postlist-btn">Tạo bài viết</button>
        </div>
        <div className="postcard-wrapper">
            {
                list.map((post) => (
                    <PostCard 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        date={post.date}
                        description={post.description}
                        poster={post.poster}
                        deletePost={handleDeletePost}
                    />
                ))
            }
        </div>

        </>
        
    )
}