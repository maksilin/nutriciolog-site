// Stripe
const stripe = Stripe('pk_test_ваш_публичный_ключ');
const elements = stripe.elements();
const cardElement = elements.create('card');

cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const cardErrors = document.getElementById('card-errors');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    cardErrors.textContent = error.message;
  } else {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: currentAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Оплата прошла успешно!');
          closePaymentModal();
        } else {
          alert('Ошибка оплаты. Попробуйте снова.');
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  }
});

// Модальное окно
const modal = document.getElementById('payment-modal');
let currentAmount = 0;

function openPaymentModal(amount) {
  currentAmount = amount;
  modal.style.display = 'block';
}

function closePaymentModal() {
  modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target === modal) {
    closePaymentModal();
  }
};
