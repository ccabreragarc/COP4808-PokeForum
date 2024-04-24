import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './CommentsList.css';

function CommentsList({ postId, comments, setComments }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return; // Guard clause to ensure postId is present

      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId); // Fetch only comments that match the current post ID

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [postId, setComments]); // Dependency on postId ensures comments are re-fetched when viewing a new post

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const { error } = await supabase
        .from('comments')
        .delete()
        .match({ id });

      if (error) {
        console.error('Error deleting comment:', error);
      } else {
        setComments(currentComments => currentComments.filter(comment => comment.id !== id));
      }
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.comment);
  };

  const handleSave = async (id) => {
    const updates = {
      comment: editText,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from('comments')
      .update(updates)
      .match({ id });

    if (error) {
      console.error('Error updating comment:', error);
    } else {
      setComments(currentComments =>
        currentComments.map(comment =>
          comment.id === id ? { ...comment, ...updates } : comment
        )
      );
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div>
      {comments && comments.map((comment) => (
        <div key={comment.id} className="comment">
          <small>User {comment.user_id}</small>
          {editingId === comment.id ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSave(comment.id)}>Save</button>
            </div>
          ) : (
            <p>{comment.comment}</p>
          )}
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
          {editingId !== comment.id && (
            <button onClick={() => handleEdit(comment)}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
