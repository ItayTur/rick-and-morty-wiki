import { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const defaultEndPoint = 'https://rickandmortyapi.com/api/character/';

export async function getStaticProps() {
  const res = await fetch(defaultEndPoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  const { info, results: defaultCharacters = [] } = data;
  const [characters, updateCharacters] = useState(defaultCharacters);
  const [page, updatePage] = useState({ ...info, current: defaultEndPoint })
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndPoint) return;

    const request = async () => {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info
      })

      if (!nextData.info.prev) {
        updateCharacters(nextData.results)
        return;
      }

      updateCharacters(prev => [...prev, ...nextData.results])
    }

    request();
  }, [current])

  const handleLoadMore = () => {
    updatePage(prev => ({ ...prev, current: page?.next }))
  }

  const charactersJsx = characters.map(character =>
    <li key={character.id} className={styles.card}>
      <a hred='#'>
        <img src={character.image} alt={`${character.name} thumbnail`} />
        <h3>{character.name}</h3>
      </a>
    </li>
  );

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
          {charactersJsx}
        </ul>
        <p>
          <button onClick={handleLoadMore}>Load More</button>
        </p>
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
