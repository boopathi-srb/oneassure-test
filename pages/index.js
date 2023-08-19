'use client'
import styles from '../styles/Home.module.css';
import '../styles/fonts.module.css';
import Link from 'next/link';
import Layout from './layout';

export default function Home() {
  return (
    <Layout className={styles.container}>
      <div style={{ fontFamily: 'Main' }}>
        <h1 className={styles.title}>
          This is an assignment done by <a href="https://linkedin.in/rathinaboopathi-srb">Rathina  Boopathi</a> for OneAssure.
        </h1>

        <Link href={'/listings/food-listing'} className={styles.description}>
          Go the product listing page &rarr;
        </Link>

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find the code architecture and more.</p>
          </a>
        </div>
      </div>
    </Layout>
  )
}
