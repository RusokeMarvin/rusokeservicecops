import React, { useEffect, useState, useCallback } from 'react';
import Header from "../../components/header/header";
import Footer from '../../components/footer/footer';
import './home.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Home() {
    const [info, setInfo] = useState('posts');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    // Pagination State
    const [page, setPage] = useState(1);
    const limit = 10; // Number of items per page

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${info}?_page=${page}&_limit=${limit}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [info, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Create a new post
    const createPost = async () => {
        if (!newPost.title || !newPost.body) return alert("Title & body required!");
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newPost, userId: 1 }),
            });
            const post = await response.json();
            setData([post, ...data]); // Add new post to UI
            setNewPost({ title: '', body: '' }); // Clear input fields
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    // Update a post
    const updatePost = async (id) => {
        const updatedTitle = prompt("Enter new title:");
        if (!updatedTitle) return;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: updatedTitle, body: "Updated Body", userId: 1 }),
            });
            const updatedPost = await response.json();
            setData(data.map(post => (post.id === id ? updatedPost : post)));
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    // Delete a post
    const deletePost = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });
            setData(data.filter(post => post.id !== id)); // Remove from UI
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // Toggle Todo Completion
    const toggleTodo = async (id, completed) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed }),
            });
            const updatedTodo = await response.json();
            setData(data.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };
    // This useEffect is meant to initialize Aos which is used for transitions
    // The empty [] makes it run only onMount not everytime the component renders 
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <Header />
            <br />
            <div className='list'>
                {['posts', 'comments', 'albums', 'photos', 'todos', 'users'].map((category) => (
                    <button key={category} onClick={() => setInfo(category)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {info === 'posts' && (
                <div className={"form"}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Body"
                        value={newPost.body}
                        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    ></textarea>
                    <button onClick={createPost}>Create Post</button>
                </div>
            )}

            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="content">
                    {/* Here i used a map method together with arrow functions to retrieve and loop through object properties */}
                    {data.map((item) => (
                        <div key={item.id} className="card" data-aos="slide-up">
                            {info === "posts" && (
                                <>
                                    <h1>{item.title}</h1>
                                    <h2>User ID: {item.userId}</h2>
                                    <p>{item.body}</p>
                                    <div className='updatedel'>
                                        <button onClick={() => updatePost(item.id)}>Edit</button>
                                        <button onClick={() => deletePost(item.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                            {info === "comments" && (
                                <>
                                    <h1>{item.name}</h1>
                                    <h2>Email: {item.email}</h2>
                                    <p>{item.body}</p>
                                </>
                            )}
                            {info === "albums" && (
                                <>
                                    <h1>Album ID: {item.id}</h1>
                                    <h2>Title: {item.title}</h2>
                                </>
                            )}
                            {info === "photos" && (
                                <>
                                    <h1>{item.title}</h1>
                                    <img src={item.url} alt="Photo" />
                                    <img src={item.thumbnailUrl} alt="Thumbnail" />
                                </>
                            )}
                            {info === "todos" && (
                                <>
                                    <h1>{item.title}</h1>
                                    <p>Status: {item.completed ? "Completed ✅" : "Pending ❌"}</p>
                                    <button onClick={() => toggleTodo(item.id, item.completed)}>
                                        Toggle Status
                                    </button>
                                </>
                            )}
                            {info === "users" && (
                                <>
                                    <h1>{item.name}</h1>
                                    <h2>Username: {item.username}</h2>
                                    <h3>Email: {item.email}</h3>
                                    <p>Phone: {item.phone}</p>
                                    <p>Website: {item.website}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination">
                {/* Here i handled pagination by limiting the number of items per page*/}
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage(prev => prev + 1)}>
                    Next
                </button>
                <br />
                <br />
            </div>

            <Footer />
        </div>
    );
}

export default Home;
