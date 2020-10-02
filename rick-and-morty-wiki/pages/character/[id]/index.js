import Head from 'next/head'
import { defaultEndPoint } from '../../index';
import Link from 'next/link';
import Stat from '../../../components/stat/stat';
import styles from '../../../styles/Home.module.css'

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndPoint}${id}`);
  const data = await res.json();
  return {
    props: {
      data
    }
  };
}

export default function Character({ data }) {

  console.log('data', data);
  const { name, image, gender, location, origin, species, status } = data;

  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.profileDetails}>
            <h2>Details</h2>
            <ul>
              <Stat name='Name' value={name} />
              <Stat name='Status' value={status} />
              <Stat name='Gender' value={gender} />
              <Stat name='Species' value={species} />
              <Stat name='Location' value={location.name} />
              <Stat name='Originally From:' value={origin.name} />
            </ul>
          </div>
        </div>
        <Link href='/'>
          <button className={styles.button} style={{marginTop: '10px'}}>
            Back To All Characters
              </button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
