import React from 'react'

import ItemList from './ItemList/ItemList'
import styles from './Main.module.css'
function Main() {
    return (
        <main className={styles.main}>
            <ItemList />
        </main>
    )
}
export default Main
