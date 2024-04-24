import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './PostList.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';  // Adjust the path as necessary based on your project structure

const PostList = ({ posts, setPosts }) => {

  const [upvotes, setUpvotes] = useState({});

  useEffect(() => {
    const fetchUpvotes = async () => {
      const upvotesMap = {};
      await Promise.all(
        posts.map(async (post) => {
          const { data, error } = await supabase
            .from('posts')
            .select('upvotes')
            .eq('id', post.id)
            .single();

          if (error) {
            console.error('Error fetching upvotes:', error);
          } else if (data) {
            upvotesMap[post.id] = data.upvotes;
          }
        })
      );
      setUpvotes(upvotesMap);
    };

    fetchUpvotes();
  }, [posts]);

  const handleUpvote = async (postId) => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: upvotes[postId] + 1 })
      .eq('id', postId);
  
    if (error) {
      console.error('Error upvoting post:', error);
    } else {
      console.log('Post upvoted:', data);
      setUpvotes((prevUpvotes) => ({
        ...prevUpvotes,
        [postId]: prevUpvotes[postId] + 1,
      }));
    }
  };
  
const handleDelete = async (postId) => {
    // Show a confirmation dialog before deleting
    if (window.confirm("Are you sure you want to delete this post?")) {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .match({ id: postId });

        if (error) {
            console.error('Error deleting post:', error);
        } else {
            console.log('Post deleted:', data);
            setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
        }
    }
};



return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <div className="post-header">
                        <h3 className="post-title">{post.title}</h3>
                        <span className="post-date">{formatDate(post.created_at)}</span>
                    </div>
                    <p className="post-content">{post.content}</p>
                    {post.image_url && <img src={post.image_url} alt={post.title} className="post-image" />}
                    <p className="post-upvotes">Upvotes: {upvotes[post.id]}</p>
                    <button onClick={() => handleUpvote(post.id)} className="upvote-button">👍</button>
                    <button><Link to={`/edit/${post.id}`}>Edit</Link></button>
                    <button onClick={() => handleDelete(post.id)} className="delete-button">Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;

