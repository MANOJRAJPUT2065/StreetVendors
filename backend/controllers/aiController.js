// Lightweight AI placeholder to avoid external dependencies.
// Returns canned insights so the endpoint works without API keys.

// POST /api/ai/suggest
const getSuggestions = async (req, res) => {
  const { topic = 'sales' } = req.body || {};

  const suggestions = {
    sales: [
      'Run a weekday combo offer during evening rush hours.',
      'Add a QR code at the cart for quick UPI payments.',
      'Offer a loyalty punch card: buy 9, get 10th free.'
    ],
    marketing: [
      'Ask happy customers for a quick photo review you can post.',
      'Share today’s special with a geotagged Instagram story.',
      'Partner with a nearby office for pre-order lunches.'
    ],
    inventory: [
      'Track waste daily; cut low-selling items one day a week.',
      'Pre-pack top items in peak hours to reduce wait time.',
      'Keep an “86 list” board so staff know what’s out.'
    ]
  };

  const payload = {
    topic,
    suggestions: suggestions[topic] || suggestions.sales
  };

  return res.json(payload);
};

module.exports = { getSuggestions };

