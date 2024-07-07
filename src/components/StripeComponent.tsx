import { useEffect, useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  PaymentElementProps,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "../redux";

const StripeComponent = ({
  clientSecretKey,
  plateNumber,
  duration,
  totalAmount,
}: {
  clientSecretKey: string;
  plateNumber: string;
  duration: number;
  totalAmount: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const { lot } = useAppSelector(({ app }) => app);

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      clientSecretKey
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage("Something went wrong.");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  console.log(
    `lot=${lot.siteCode}&plageNumber=${plateNumber}&duration=${duration}&totalAmount=${totalAmount}&receiptEmail=${email}`
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecretKey) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion?lot=${lot.siteCode}&plageNumber=${plateNumber}&duration=${duration}&totalAmount=${totalAmount}&receiptEmail=${email}`,
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "An error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions: PaymentElementProps["options"] = {
    layout: "tabs",
  };

  return (
    <form
      className="payment-form mt-4 p-6 rounded-md"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter email address"
        className="w-full p-2 border border-gray-200 rounded-md"
      />
      <PaymentElement className="mt-4" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        type="submit"
        className="w-full bg-[#fa551d] font-bold font-sans text-white rounded-md p-3 mt-4"
      >
        {isLoading ? (
          <div className="flex space-x-2 justify-center items-center dark:invert">
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          "Pay now"
        )}
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div className="text-center mt-2 text-red-600">{message}</div>
      )}
    </form>
  );
};

export default StripeComponent;
