export default async function handler(req, res) {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'SERPAPI_KEY is not configured.' });
  }

  const params = new URLSearchParams({
    engine: 'google_news',
    q: 'AI trading bots',
    api_key: apiKey,
    num: '6',
  });

  const url = `https://serpapi.com/search?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: data.error || 'SerpApi news request failed.' });
  }

  const items = [];
  if (Array.isArray(data.news_results)) {
    data.news_results.slice(0, 6).forEach((item) => {
      items.push({
        title: item.title || item.source || 'Untitled',
        link: item.link || item.source_url || '',
        description: item.snippet || item.description || '',
        source: item.source || '',
      });
    });
  }

  if (items.length === 0 && Array.isArray(data.organic_results)) {
    data.organic_results.slice(0, 6).forEach((item) => {
      items.push({
        title: item.title || item.heading || 'Untitled',
        link: item.link || item.source_url || '',
        description: item.snippet || '',
        source: item.displayed_link || item.source || '',
      });
    });
  }

  res.status(200).json({ items: items.slice(0, 6) });
}
