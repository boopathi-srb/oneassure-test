import Head from 'next/head';
import styles from '../styles/Home.module.css';
 
import '../styles/fonts.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
      </Head>
      <main style={{ fontFamily: 'Main' }}>
    
      </main>
    </div>
  )
}
