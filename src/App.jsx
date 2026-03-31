import { useEffect, useState } from 'react';

const HACKATHONS_API = '/api/hackathons.js';
const NEWS_API = '/api/news.js';

const sections = [
  {
    title: 'AI Trading Bots',
    description: 'Explore intelligent trading bots powered by machine learning and real-time data. Our bots are built to identify market patterns, execute strategies, and help traders stay ahead.',
    highlights: ['Automated strategy execution', 'Risk management tools', 'Market signal insights'],
  },
  {
    title: 'Live Hackathons',
    description: 'Join live hackathons focused on AI trading and financial innovation. Collaborate with developers, data scientists, and traders to build the next generation of algorithmic solutions.',
    highlights: ['Live coding sessions', 'Team collaboration', 'Mentorship and prizes'],
  },
  {
    title: 'International News',
    description: 'Stay updated with international news that impacts markets and technology. We curate the latest headlines from finance, AI, and global events in one place.',
    highlights: ['Global market updates', 'AI industry headlines', 'Regulatory and fintech news'],
  },
];

function parseApiItems(results = []) {
  return results
    .map((item) => ({
      title: item.title || item.headline || item.heading || '',
      link: item.link || item.url || item.source_url || '',
      description: item.snippet || item.description || item.summary || '',
      source: item.source || item.domain || item.displayed_link || '',
    }))
    .filter((item) => item.title && item.link)
    .slice(0, 6);
}

async function fetchJson(url) {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type') || '';
  const bodyText = await response.text();

  if (!response.ok) {
    let errorMessage = `API returned ${response.status}`;
    try {
      const errorJson = JSON.parse(bodyText);
      errorMessage = errorJson.error || errorMessage;
    } catch {
      if (bodyText) errorMessage = bodyText.slice(0, 120);
    }
    throw new Error(errorMessage);
  }

  if (!contentType.includes('application/json')) {
    throw new Error(`Unexpected API response: ${bodyText.slice(0, 140)}`);
  }

  return JSON.parse(bodyText);
}

function App() {
  const [hackathons, setHackathons] = useState([]);
  const [hackathonLoading, setHackathonLoading] = useState(true);
  const [hackathonError, setHackathonError] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    async function loadHackathons() {
      try {
        const data = await fetchJson(HACKATHONS_API);
        setHackathons(parseApiItems(data.items || []));
      } catch (err) {
        console.error(err);
        setHackathonError(err.message || 'Unable to load live hackathons right now. Please refresh the page.');
      } finally {
        setHackathonLoading(false);
      }
    }

    async function loadNews() {
      try {
        const data = await fetchJson(NEWS_API);
        setNewsItems(parseApiItems(data.items || []));
      } catch (err) {
        console.error(err);
        setNewsError(err.message || 'Unable to load AI trading bot news right now. Please refresh the page.');
      } finally {
        setNewsLoading(false);
      }
    }

    loadHackathons();
    loadNews();
  }, []);

  return (
    <div className="page-shell">
      <header className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">AI Trading + Live Hackathons</span>
          <h1>Build smarter trading bots, join live hackathons, and track global news.</h1>
          <p>
            Discover AI-powered trading strategies, participate in live community events, and follow international market news with a modern, responsive experience.
          </p>
          <div className="hero-actions">
            <a href="#hackathons" className="button primary">Explore Hackathons</a>
            <a href="#news" className="button secondary">Read Latest News</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="card stats-card">
            <h2>Live metrics</h2>
            <ul>
              <li>12+ active bots</li>
              <li>30+ hackathons hosted</li>
              <li>24/7 market coverage</li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="overview-section" id="bots">
          <div className="section-header">
            <p className="eyebrow">AI Trading Bots</p>
            <h2>Automate your market moves with confidence.</h2>
          </div>
          <div className="grid">
            {sections[0].highlights.map((item) => (
              <article key={item} className="feature-card">
                <h3>{item}</h3>
                <p>
                  {item === 'Automated strategy execution'
                    ? 'Deploy bots that execute orders automatically based on market signals.'
                    : item === 'Risk management tools'
                    ? 'Protect capital with stop-loss, portfolio controls, and risk analytics.'
                    : 'Gain visibility into the most important market indicators in real time.'}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="overview-section" id="hackathons">
          <div className="section-header">
            <p className="eyebrow">Live Hackathons</p>
            <h2>Current and upcoming AI trading hackathons.</h2>
          </div>
          <div className="card content-card">
            <p>{sections[1].description}</p>
            <ul>
              {sections[1].highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="event-toolbar">
            {hackathonLoading && <p>Searching live AI trading agent hackathons...</p>}
            {hackathonError && <p>{hackathonError}</p>}
            {!hackathonLoading && !hackathonError && null}
          </div>

          {hackathonLoading ? (
            <div className="loading-state">Loading hackathon search results…</div>
          ) : hackathonError ? (
            <div className="loading-state">{hackathonError}</div>
          ) : hackathons.length > 0 ? (
            <div className="event-grid">
              {hackathons.map((hackathon) => (
                <article key={hackathon.link} className="event-card">
                  <h3>{hackathon.title}</h3>
                  {hackathon.source && <p>{hackathon.source}</p>}
                  <p>{hackathon.description}</p>
                  <a className="button secondary" href={hackathon.link} target="_blank" rel="noreferrer">
                    Visit listing
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="loading-state">No hackathon search results found. Try again later.</div>
          )}
        </section>

        <section className="overview-section" id="news">
          <div className="section-header">
            <p className="eyebrow">AI Trading News</p>
            <h2>International headlines about AI trading bots.</h2>
          </div>
          <div className="event-toolbar">
            {newsLoading && <p>Fetching AI trading bot news...</p>}
            {newsError && <p>{newsError}</p>}
          </div>
          <div className="news-grid">
            {!newsLoading && !newsError && newsItems.length > 0 ? (
              newsItems.map((item) => (
                <article key={item.link} className="news-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="button secondary">
                    Read more
                  </a>
                </article>
              ))
            ) : (
              !newsLoading && newsError && (
                <article className="news-card">
                  <h3>News unavailable</h3>
                  <p>We couldn't fetch live AI trading bot news right now. Please refresh the page or check again later.</p>
                </article>
              )
            )}
          </div>
        </section>
      </main>

      <footer className="footer-section">
        
      </footer>
    </div>
  );
}

export default App;
