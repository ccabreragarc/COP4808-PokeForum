import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './EditView.css';

const EditPost = () => {
    const { id } = useParams(); // This captures the post ID from the URL
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('title, content, image_url')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
        } else {
            setTitle(data.title);
            setContent(data.content);
            setImageUrl(data.image_url || '');
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('posts')
            .update({ title, content, image_url: imageUrl })
            .eq('id', id);
    
        if (error) {
            console.error('Error updating post:', error);
        } else {
            console.log('Post updated:', data);
            // navigate('/forum'); // Redirect to the Pokémon forum page after update
            navigate(-1); // Optionally, navigate back to the previous page, likely the forum
        }
    };
    

    return (
        <form onSubmit={handleUpdate} className="edit-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Content"
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL (optional)"
            />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default EditPost;
