import type  { PostCardProps } from "./PostCard.module"

type PostCard = PostCardProps & {
    deletePost?: (id: string) => void
}

export const PostCard = ({title, author, date, description, poster, id, deletePost} : PostCard) => {


    return (
        <div style={{padding: "10px 12px",
            maxWidth: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid #979393ff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
        }} className="postcard">
            <img style={{maxWidth: "300px", borderRadius: "12px"}} src={poster} alt="poster" />
            <h2>{title}</h2>
            <p style={{fontSize: "1.25rem"}}>By {author}</p>
            <p style={{fontSize: "1rem"}}>{description}</p>
            <p>Public in {date}</p>
            <div style={{display: "flex", gap: "20px"}}>
                <button className="postcard-btn">Đọc thêm</button>
                <button onClick={() => deletePost?.(id!)} className="postcard-btn">Xóa</button>
            </div>

        </div>
    )
}