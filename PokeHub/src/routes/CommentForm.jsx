import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function CommentForm({ postId, onNewComment }) {
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState('');  // State to hold user-provided ID

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!comment.trim() || !userId.trim()) {
          alert('Both user ID and comment are required.');
          return;
      }
  
      const submissionData = {
          post_id: postId,
          comment: comment.trim(),
          user_id: userId.trim()
      };
  
      try {
        const { data, error } = await supabase
        .from('comments')
        .insert([submissionData])
        .select('*');  // Explicitly request to return all columns of the inserted row
    
          console.log('Insert response data:', data);  // Debug: Log the raw data response
  
          if (error) {
              console.error('Error posting comment:', error);
              alert('Error posting comment: ' + error.message);
              return; // Stop further execution in case of error
          }
  
          if (data && data.length > 0) {
              onNewComment(data[0]); // Safe to access data[0] after this check
              setComment('');
              setUserId('');
          } else {
              // This log will help understand what 'data' contains if it's not what's expected
              console.error('No data returned from the insert operation, received:', data);
              alert('Failed to post comment. No data returned.');
          }
      } catch (error) {
          console.error('An unexpected error occurred:', error);
          alert('An error occurred while posting the comment: ' + error.message);
      }
  };
  

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="User ID"
                required
            />
            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write a comment..."
                required
            />
            <button type="submit">Post Comment</button>
        </form>
    );
}

export default CommentForm;
