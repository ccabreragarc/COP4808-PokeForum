import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const PostForm = ({ onNewPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from('posts').insert([
      { title, content, image_url: imageUrl, upvotes: 0 }
    ]);

    if (error) console.log('Error creating post:', error);
    else {
      console.log('Post created:', data);
      setTitle('');
      setContent('');
      setImageUrl('');
      onNewPost();
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={e => setContent(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Image URL (optional)" 
        value={imageUrl} 
        onChange={e => setImageUrl(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
