import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    ensureUserId();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const ensureUserId = () => {
    if (!localStorage.getItem('userId')) {
      const randomId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('userId', randomId);
    }
  };

  return (
    <div className="homePage">
      <h1>Welcome to PokeHub!</h1>
      <h3>Here is where you can share and explore posts about your favorite Pokémon!</h3>
      <div className="postList">
        {posts.map((post) => (
          <Link key={post.id} to={`/details/${post.id}`} className="postLink">
            <div className="postPreview">
              <h3>{post.title}</h3>
              <img src={post.image_url} alt={post.title} className="postImage" />
              <p>{post.content.slice(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
