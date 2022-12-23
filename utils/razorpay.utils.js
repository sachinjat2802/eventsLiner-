import Razorpay from "razorpay";
class RazorpayUtil {
  capturePayments(
    keyId,
    secret,
    paymentId,
    paidAmount
  ) {
    const paymentGateway = new Razorpay({
      key_id: keyId,
      key_secret: secret,
    });
    return paymentGateway.payments.capture(paymentId, paidAmount * 100);
  }

   createOrder(
    keyId,
    secret,
    amount,
    currency,
    receipt,
    payment_capture,
    notes
  ) {
    const paymentGateway = new Razorpay({
      key_id: keyId,
      key_secret: secret,
    });
    return paymentGateway.orders.create({
      amount: amount,
      currency: currency,
      receipt: receipt,
      payment_capture: payment_capture,
      notes: {
        note1: notes
      },
    });
  }

   fetchOrder(keyId, secret, orderId) {
    const paymentGateway = new Razorpay({
      key_id: keyId,
      key_secret: secret,
    });
    return paymentGateway.orders.fetch(orderId);
  }

  refund(
    keyId,
    secret,
    paymentId,
    amount
  ) {
    const options = {
      payment_id: paymentId,
      amount: amount,
    };
    const paymentGateway = new Razorpay({
      key_id: keyId,
      key_secret: secret,
    });

    return paymentGateway.refund(options);
  }
}

export default new RazorpayUtil();