import React from 'react'
import { Helmet } from 'react-helmet';
import Footer from './Footer';

const Layout = ({ children, title, description, author, keywords }) => {
    return (
        <>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

Layout.defaultProps = {
    title: "Blog app",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Suman",
};
export default Layout