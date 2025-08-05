export default async function handler(req, res) {
  const { method, body } = req;

  try {
    const response = await fetch('http://49.12.128.167:7001/api/v1/calculate', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed' });
  }
}
