export default async function handler(req, res) {
  const { method, body, query } = req;

  // Собираем путь из динамических параметров
  const path = Array.isArray(query.path) ? query.path.join('/') : query.path || '';
  const targetUrl = `http://49.12.128.167:7001/api/${path}`;

  console.log('Proxy request:', { method, path, targetUrl, query });

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    console.log('Proxy response:', response.status, data);
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed', targetUrl, path, query });
  }
}
