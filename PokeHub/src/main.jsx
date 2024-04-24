import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNav from './routes/TopNav.jsx';
import PokeForum from './routes/PokeForum.jsx';
import EditView from './routes/EditView.jsx';
import PostDetailView from './routes/PostDetailView.jsx';
//import SignIn from './components/SignIn';
/*
import CreatePokemon from "./routes/CreatePokemon.jsx";
import PokemonDetails from './routes/PokemonDetails.jsx';
import DeletePokemon from "./routes/DeletePokemon.jsx";*/

/*
        <Route path="/create" element={<CreatePokemon />} />
        
        
        <Route path="/delete/:id" element={<DeletePokemon />} />
        <Route path="/details/:id" element={<PokemonDetails />} />
        <Route path="/signin" element={<SignIn />} />

*/


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TopNav />}>
      <Route path="/forum" element={<PokeForum />} />
      <Route path="/edit/:id" element={<EditView />} />
      <Route path="/details/:id" element={<PostDetailView />} />
      <Route index={true} element={<App />} />

        <Route path="*" element={
          <div>
            <p className="message">There's nothing here!</p>
          </div>
        }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
