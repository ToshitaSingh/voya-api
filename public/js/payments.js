import axios from 'axios';
import { showAlert } from './alerts.js';
export const bookTour = async (tourId) => {
  // 1) Get create-order from api
  try {
    const res = await axios(`/api/v1/bookings/create-order/${tourId}`, {
      method: 'POST',
    });

    const { order, razorpayKey } = res.data;

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: 'Voya',
      description: 'Tour Booking',
      order_id: order.id,
      handler: async function (response) {
        await axios.post(`/api/v1/bookings/verify-payment`, {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        location.assign('/my-tours');
      },
      theme: {
        color: '#55c57a',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
