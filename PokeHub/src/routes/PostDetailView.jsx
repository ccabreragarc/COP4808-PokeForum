import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './PostDetailView.css';
import CommentForm from './CommentForm'; // Ensure you have this component created
import CommentsList from './CommentsList'; // Ensure you have this component created


const PostDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
        } else {
            setPost(data);
        }
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id);

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data);
        }
    };

    const addCommentToPost = (newComment) => {
        setComments([...comments, newComment]);
    };

    const handleUpvote = async () => {
        if (!post) return;

        const newUpvotes = (post.upvotes || 0) + 1;
        const { data, error } = await supabase
            .from('posts')
            .update({ upvotes: newUpvotes })
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error upvoting post:', error);
        } else {
            setPost({ ...post, upvotes: newUpvotes });
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const { data, error } = await supabase
                .from('posts')
                .delete()
                .match({ id });

            if (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete the post.');
            } else {
                console.log('Post deleted:', data);
                navigate('/');
            }
        }
    };

    

    return (
        <div className="postDetail">
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    {post.image_url && <img src={post.image_url} alt={post.title} className="detailImage" />}
                    <p>{post.content}</p>
                    <div className="actions">
                        <button onClick={handleUpvote}>👍 Upvote ({post.upvotes})</button>
                        <Link to={`/edit/${id}`} className="editLink">Edit Post</Link>
                        <button onClick={handleDelete} className="deleteButton">Delete Post</button>
                    </div>
                    <CommentsList comments={comments} setComments={setComments} postId={id} />
                    <CommentForm postId={id} onNewComment={addCommentToPost} />
                    <Link to="/">Back to Home</Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetailView;
