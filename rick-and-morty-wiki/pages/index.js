import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

    const request = async () => {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info
      })

      if (!nextData.info?.prev) {
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

  const handleGetAll = e => {
    e.preventDefault();
    updateSearchQuery('');
    updatePage({ current: defaultEndPoint });
  }

  const hasCharacters = Boolean(characters);

  const charactersJsx = hasCharacters ? characters.map(character =>
    <motion.li key={character.id} className={styles.card} whileHover={{
      scale: [1, 1.4, 1.2],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: .2
      },
      filter: [
        'hue-rotate(0) contrast(100%)',
        'hue-rotate(360deg) contrast(200%)',
        'hue-rotate(45deg) contrast(300%)',
        'hue-rotate(0) contrast(100%)'
      ]
    }}>
        <Link href='/character/[id]' as={`/character/${character.id}`}>
          <a>
            <img src={character.image} alt={`${character.name} thumbnail`} />
            <h3>{character.name}</h3>
          </a>
        </Link>
    </motion.li>
  ) : <h3>learn to spell</h3>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <motion.div initial='hidden' animate='visible' variants={{
          hidden: {
            scale: .8,
            opacity: 0
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: .4
            }
          }
        }}>
          <h1 className={styles.title}>
            Wubba Lubba Dub Dub!
        </h1>
        </motion.div>

        <p className={styles.description}>
          Rick and Morty Character Wiki
        </p>

        <form className={styles.search} onSubmit={handleSearch}>
          <input placeholder='example: Mr. mees' value={searchQuery} onChange={e => updateSearchQuery(e.target.value)} name='query' type='search' />
          <button className={styles.button}>Search</button>
          <button onClick={handleGetAll} className={styles.button}>Get All</button>
        </form>

        <ul className={styles.grid}>
          {charactersJsx}
        </ul>
        <p>
          {hasCharacters && <button className={styles.button} onClick={handleLoadMore}>Load More</button>}
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
