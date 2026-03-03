import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'

const Feed = () => {
    console.log("Main Feed component ke andar hoon!");
    const [posts, setPosts] = useState([])


   useEffect(() => {
    // 1. Pehle ye check karo ki function chala ya nahi
    console.log("🚀 Request trigger ho rahi hai...");

    const fetchData = async () => {
        try {
            // 'http' use karo 'https' nahi
            const res = await axios.get('http://localhost:8000/showAll-post');
            console.log("Pura Response:", res); // Yahan Axios ka structure dikhega
            console.log("Asli Data:", res.data); // Yahan Backend ka bheja hua data dikhega
            setPosts(res.data.posts);
        } catch (err) {
            // Agar error hai toh yahan dikhega
            console.error("❌ Axios Error:", err.response ? err.response.data : err.message);
        }
    };

    fetchData();
}, []);
    return (
        <>
            <section className='feed-section'>
                {posts.length > 0 ? (
                    posts.map(( post) => (
                        <div key={post.id} className="post-card">
                            <img src={post.image} alt={post.caption} className="post-image" />
                            <div className="post-content">
                                <p className="post-caption">{post.caption}</p>
                                <div className="post-stats">
                                    <span>❤️ {post.likes} likes</span>
                                    <span>💬 {post.comments} comments</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="no-posts">No posts yet</h1>
                )}
            </section>
        </>
    )
}

export default Feed



