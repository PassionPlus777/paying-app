import Lottie from "react-lottie";
// import QRCodeComponent from "./QRCodeComponent";

import closeBtn from "../assets/CloseBtn.svg";
import QRCode from "../assets/QRcode.json";

const CashComponent = ({ onClose }: { onClose: () => void }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: QRCode,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <button
        onClick={onClose}
        className="absolute right-[30px] top-[30px] w-[36px]"
      >
        <img className="close-btn" src={closeBtn} alt="close"></img>
      </button>
      <p className="text-[#FA551D] text-[28px] font-bold text-center">
        Cash App Pay
      </p>
      <Lottie options={defaultOptions} height={200} width={200} />

      <div className="flex flex-row mt-3 bg-[#FFF2EE] rounded-[10px] p-8 items-center w-full h-fit">
        <p className="text-md lg:text-xl font-bold text-[#091C62]">
          After submitting your order, <br></br>scan the QR code using{" "}
          <a
            className="text-[##091C62] opacity-90 underline"
            href="https://cash.app/"
            target="_blank"
          >
            Cash App
          </a>{" "}
          Pay.
        </p>
      </div>
      {/* <div className="mt-8 text-white w-full" onClick={openModal}>
        <Button
          variant="contained"
          className="w-full"
          sx={{
            backgroundColor: "#FA551D",
            "&:hover": {
              backgroundColor: "#FA551D", // Optional: Changes the background color on hover to a darker red
            },
            color: "white",
            fontSize: "24px",
            borderRadius: "10px",
          }}
          // className="btn w-full p-2.5 rounded-[20px]"
        >
          Reveal QR code
        </Button>
      </div> */}
      {/* <QRCodeComponent isOpen={isModalOpen} onClose={closeModal} /> */}
    </>
  );
};

export default CashComponent;
