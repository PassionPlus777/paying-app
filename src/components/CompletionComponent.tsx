import { FC, useEffect, useState } from "react";
import { Stripe } from "@stripe/stripe-js";
import { format } from "date-fns";

import success from "../assets/Success.gif";

interface CompletionComponentProps {
  stripePromise: Promise<Stripe | null>;
}

const CompletionComponent: FC<CompletionComponentProps> = ({
  stripePromise,
}) => {
  const [messageBody, setMessageBody] = useState<React.ReactNode>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [emial, setEmail] = useState<string>("");
  const [siteCode, setSiteCode] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");
  // const [duration, setDuraion] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      if (!stripe) {
        setMessageBody("Stripe failed to load.");
        return;
      }

      const url = new URL(window.location.href);

      const clientSecret = url.searchParams.get("payment_intent_client_secret");

      const lot = url.searchParams.get("lot");
      lot && setSiteCode(lot);
      const plageNumber = url.searchParams.get("plageNumber");
      plageNumber && setPlateNumber(plageNumber);
      // const duration = url.searchParams.get("duration");
      // duration && setDuraion(duration);
      const totalAmount = url.searchParams.get("totalAmount");
      totalAmount && setAmount(totalAmount);
      const receiptEmail = url.searchParams.get("receiptEmail");
      receiptEmail && setEmail(receiptEmail);

      if (!clientSecret) {
        setMessageBody("No client secret found in URL.");
        return;
      }

      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      if (error) {
        setMessageBody(`Error: ${error.message}`);
      } else if (paymentIntent) {
        setStatus(paymentIntent.status);
        setMessageBody(
          <>
            Payment {paymentIntent.status}:{" "}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              className="text-blue-500 font-bold"
            >
              Go to Stripe
            </a>
          </>
        );
      }
    });
  }, [stripePromise]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center completion">
      <div className="rounded-2xl bg-[#FFFAF9] py-4 px-8 sm:px-20 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="mt-5">
            <img src={success} alt="Success" className="success-img" />
          </div>
          <p className="sm:text-4xl text-2xl text-[#FA551D] font-bold mt-4">
            Payment {status}!
          </p>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Lot:{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              {siteCode}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Plate Number:{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              {plateNumber}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Amount:{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              ${amount}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Receipt Email:{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              {emial}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Payment Date (EDT):{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              {format(new Date(), "MM/dd/yyyy HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl text-[red] font-bold mt-6">
            Thanks for your park!
          </p>
          <a href="/" className="text-xl text-[#091C62] underline mt-4">
            HOME
          </a>
          <div id="messages" role="alert" className="mt-4">
            {messageBody}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionComponent;
