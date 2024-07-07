import { useAppSelector } from "../redux";
import { addMinutes, format } from "date-fns";

import closeBtn from "../assets/CloseBtn.svg";

const DetailComponent = ({
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
  const { lot } = useAppSelector(({ app }) => app);

  return (
    <>
      {/* Add your detailed content here */}
      <button
        onClick={onClose}
        className="absolute right-[30px] top-[30px] w-[36px]"
      >
        <img className="close-btn" src={closeBtn} alt="close"></img>
      </button>
      <p className="text-[#FA551D] text-[28px] font-bold text-center">
        View Detail
      </p>
      <div className="mt-6">
        <div className="flex flex-row justify-between">
          <p className="text-[#091C62] text-left font-bold text-[20px]">
            CityPark.io - Lot:{lot.siteCode}
          </p>
          <p className="text-[#091C62] text-left text-[20px]">${totalAmount}</p>
        </div>
        <p className="text-left">
          <strong>LPN</strong>: {plateNumber}
        </p>
        <p className="text-left">
          <strong>Rate</strong>: ${lot.hourlyRate}/Hr
        </p>
        <p className="text-left">
          <strong>Valid</strong>: {format(new Date(), "MM/dd HH:mm")} EDT -{" "}
          {format(addMinutes(new Date(), duration), "MM/dd HH:mm")} EDT
        </p>
      </div>
      <hr className="my-4"></hr>
      <div className="mt-6">
        <div className="flex flex-row justify-between">
          <p className="text-[#091C62] font-bold p-1 text-left text-[20px]">
            Platform Fee
          </p>
          <p className="text-[#091C62] p-1 text-left text-[20px]">${0.5}</p>
        </div>
        <p className="text-left">CityPark Inc. Platform Fee</p>
      </div>
      <hr className="my-4"></hr>
      <div className="mt-6">
        <div className="flex flex-row justify-between">
          <p className="text-[#091C62] font-bold p-1 text-left text-[20px]">
            Subtotal
          </p>
          <p className="text-[#091C62] p-1 text-left text-[20px]">
            ${totalAmount + 0.5}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-[grey] p-1 text-left text-[20px]">
            Sales tax (6.5%)
          </p>
          <p className="text-[grey] p-1 text-left text-[20px]">
            ${(totalAmount * 0.065).toFixed(2)}
          </p>
        </div>
      </div>
      <hr className="my-4"></hr>
      <div className="mt-6">
        <div className="flex flex-row justify-between">
          <p className="text-[#091C62] p-1 font-bold text-left text-[20px]">
            Total due
          </p>
          <p className="text-[#091C62] p-1 text-left text-[20px]">
            ${(totalAmount * 1.065 + 0.5).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailComponent;
