import React from 'react';
import { styles } from '../styles/Layout';

export const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
