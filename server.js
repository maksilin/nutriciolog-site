const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const app = express();
const stripe = Stripe('sk_test_ваш_секретный_ключ');

app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'rub',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
