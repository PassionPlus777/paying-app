import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeComponent from "./StripeComponent";

import { useAppDispatch, useAppSelector } from "../redux";
import { getClientSecret } from "../redux/slice/appReducer";

import { appearance } from "../config";

import closeBtn from "../assets/CloseBtn.svg";

const CardComponent = ({
  plateNumber,
  duration,
  totalAmount,
  onClose,
}: {
  plateNumber: string;
  duration: number;
  totalAmount: number;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { clientSecret } = useAppSelector(({ app }) => app);

  useEffect(() => {
    totalAmount && dispatch(getClientSecret(totalAmount * 100));
  }, [totalAmount]);
  return (
    <>
      <button
        onClick={onClose}
        className="absolute right-[10px] top-[10px] w-[36px]"
      >
        <img src={closeBtn} alt="close"></img>
      </button>
      <p className="text-[#FA551D] text-[28px] font-bold text-center">
        Card Pay
      </p>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance }}
          stripe={loadStripe(import.meta.env.VITE_API_STRIPE_TEST)}
        >
          <StripeComponent
            clientSecretKey={clientSecret}
            plateNumber={plateNumber}
            duration={duration}
            totalAmount={totalAmount}
          />
        </Elements>
      )}
    </>
  );
};

export default CardComponent;
