import type { NextApiRequest, NextApiResponse } from 'next';

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

export default function authMiddleware(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Continue processing the request with the original handler if the API key is valid
    return handler(req, res);
  };
}
