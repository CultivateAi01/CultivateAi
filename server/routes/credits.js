import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock credits data
let userCredits = {};

// Get user credits and transaction history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    // Get current credits (mock data)
    const credits = userCredits[userId] || {
      balance: 100,
      total_purchased: 100,
      total_used: 0
    };

    // Mock transaction history
    const transactions = [
      {
        id: 'txn_1',
        type: 'purchase',
        amount: 100,
        description: 'Welcome credits',
        created_at: new Date().toISOString()
      }
    ];

    res.json({ 
      credits,
      transactions
    });
  } catch (error) {
    console.error('Credits fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch credits' });
  }
});

// Purchase credits
router.post('/purchase', authenticateToken, async (req, res) => {
  try {
    const { amount, payment_intent_id } = req.body;
    const userId = req.auth.userId;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid credit amount' });
    }

    // Get current credits
    const currentCredits = userCredits[userId] || {
      balance: 100,
      total_purchased: 100,
      total_used: 0
    };

    // Update credits
    const updatedCredits = {
      balance: currentCredits.balance + amount,
      total_purchased: currentCredits.total_purchased + amount,
      total_used: currentCredits.total_used,
      updated_at: new Date().toISOString()
    };

    userCredits[userId] = updatedCredits;

    res.json({ 
      message: 'Credits purchased successfully',
      credits: updatedCredits
    });
  } catch (error) {
    console.error('Credit purchase error:', error);
    res.status(500).json({ error: 'Failed to purchase credits' });
  }
});

// Get credit packages
router.get('/packages', (req, res) => {
  const packages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 100,
      price: 9.99,
      description: 'Perfect for trying out our AI tools',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      credits: 500,
      price: 39.99,
      description: 'Great for serious entrepreneurs',
      popular: true,
      bonus: 50 // Bonus credits
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      credits: 1500,
      price: 99.99,
      description: 'For teams and agencies',
      popular: false,
      bonus: 200 // Bonus credits
    }
  ];

  res.json({ packages });
});

export default router;