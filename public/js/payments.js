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
      name: 'Voya',
      description: 'Tour Booking',
      order_id: order.id,
      handler: async function (response) {
        await axios.post(`/api/v1/bookings/verify-payment`, response);
        location.assign('/my-tours');
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
