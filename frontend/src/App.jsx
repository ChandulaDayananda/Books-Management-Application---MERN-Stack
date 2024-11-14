import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBooks from './pages/DeleteBook';
import CreateBooks from './pages/CreateBooks';

const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/create" element={<CreateBooks />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/delete/:id" element={<DeleteBooks />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
    );
};

export default App;
