import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user credits and transaction history
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Get current credits
    const { data: credits, error: creditsError } = await supabase
      .from('credits')
      .select('*')
      .eq('profile_id', req.profile.id)
      .single();

    if (creditsError) {
      return res.status(400).json({ error: creditsError.message });
    }

    // Get transaction history
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select(`
        *,
        agent_runs(
          agents(name, icon)
        )
      `)
      .eq('profile_id', req.profile.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (transactionsError) {
      return res.status(400).json({ error: transactionsError.message });
    }

    res.json({ 
      credits: credits || { balance: 0, total_purchased: 0, total_used: 0 },
      transactions: transactions || []
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

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid credit amount' });
    }

    // Get current credits
    const { data: currentCredits, error: creditsError } = await supabase
      .from('credits')
      .select('*')
      .eq('profile_id', req.profile.id)
      .single();

    if (creditsError) {
      return res.status(400).json({ error: creditsError.message });
    }

    // Update credits
    const { data: updatedCredits, error: updateError } = await supabase
      .from('credits')
      .update({
        balance: currentCredits.balance + amount,
        total_purchased: currentCredits.total_purchased + amount,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', req.profile.id)
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    // Create transaction record
    await supabase
      .from('transactions')
      .insert({
        profile_id: req.profile.id,
        type: 'purchase',
        amount: amount,
        description: `Purchased ${amount} credits`,
        stripe_payment_intent_id: payment_intent_id
      });

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