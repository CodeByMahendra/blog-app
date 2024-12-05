import React from 'react';

const ErrorPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '10%',
        color: '#333',
    },
    heading: {
        fontSize: '5rem',
        color: 'red',
    },
    message: {
        fontSize: '1.5rem',
    },
};

export default ErrorPage;
