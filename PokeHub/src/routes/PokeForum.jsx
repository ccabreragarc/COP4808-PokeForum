import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import "./PokeForum.css";
import { debounce } from 'lodash';

const PokeForum = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('none');  // Default sort key set to 'none'

  // Function to fetch posts
  const fetchPosts = async () => {
    let query = supabase.from('posts').select('*');

    if (sortKey !== 'none') {
      query = query.order(sortKey, { ascending: false });
    }

    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  // Debounced fetch for search terms
  const debouncedFetchPosts = debounce(() => {
    fetchPosts();
  }, 300);

  // Effect for searchTerm changes
  useEffect(() => {
    if (searchTerm === '') {
      fetchPosts();  // Fetch all if search term is cleared
    } else {
      debouncedFetchPosts();
    }
    // Cleanup the debounce
    return () => debouncedFetchPosts.cancel();
  }, [searchTerm, sortKey]); // Include sortKey in the dependencies array

  // Effect to handle sort key changes
  useEffect(() => {
    fetchPosts();
  }, [sortKey]); // Refetch posts when sortKey changes

  // Handle search input changes
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  // Handle changes in sort selection
  const handleSortChange = event => {
    setSortKey(event.target.value);
  };

  return (
    <div>
      <h1>Pokémon Forum</h1>
      <PostForm onNewPost={fetchPosts} />
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: '10px', padding: '5px' }}
      />
      <select
        value={sortKey}
        onChange={handleSortChange}
        style={{ margin: '10px', padding: '5px' }}
      >
        <option value="none">No Sorting</option>
        <option value="created_at">Sort by Created Time</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default PokeForum;
