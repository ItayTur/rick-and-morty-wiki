import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export const defaultEndPoint = 'https://rickandmortyapi.com/api/character/';

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
  const [searchQuery, updateSearchQuery] = useState('');
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
    updatePage(prev => ({ ...prev, current: prev?.next }))
  }

  const handleSearch = e => {
    e.preventDefault();
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${searchQuery}`;

    updatePage({
      current: endpoint
    });
  }

  const charactersJsx = characters.map(character =>
    <li key={character.id} className={styles.card}>
      <Link href='/character/[id]' as={`/character/${character.id}`}>
        <a>
          <img src={character.image} alt={`${character.name} thumbnail`} />
          <h3>{character.name}</h3>
        </a>
      </Link>
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

        <form className={styles.search} onSubmit={handleSearch}>
          <input onChange={e => updateSearchQuery(e.target.value)} name='query' type='search' />
          <button className={styles.button}>Search</button>
        </form>

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
