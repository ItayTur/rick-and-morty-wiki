import Head from 'next/head'
import styles from '../styles/Home.module.css'

const apiUrl = 'https://rickandmortyapi.com/api/character/';

export async function getStaticProps() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  const { results = [] } = data;

  const characters = results.map(character => (
    <li key={character.id} className={styles.card}>
      <a hred='#'>
        <img src={character.image} alt={`${character.name} thumbnail`}/>
        <h3>{character.name}</h3>
      </a>
    </li>
  ));
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wubba Lubba Dub Dub!
        </h1>

        <p className={styles.description}>
          Rick and Morty Character Wiki
        </p>

        <ul className={styles.grid}>
          {characters}
        </ul>
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
