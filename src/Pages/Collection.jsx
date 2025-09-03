import React from 'react';
import Layout from '../components/Layouts/Layout'; // ✅ Correct
// import Category from '../components/Category/Category';
import Products from '../components/Products/Products';



const Product = () => {
    return (
        <Layout>
            <Products />
        </Layout>
    );
};

export default Product;