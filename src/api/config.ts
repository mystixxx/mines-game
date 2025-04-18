// API Configuration
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in .env file');
}

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  HEADERS: {
    "X-API-KEY":
      "TxDONKnVZslnzVq2kZHoxQt9715WTZHyYVcbij0nQQTKHKIFVYmRGZtOWUP8SnEp",
    "Content-Type": "application/json",
  },
};
