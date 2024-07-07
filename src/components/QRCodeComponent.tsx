import closeBtn from "../assets/CloseBtn.svg";

const QRCodeComponent = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-white rounded-lg border-solid border-0 border-[#FA551D] relative p-10"
        style={{ transition: "transform 3s", transform: "scale(1)" }}
      >
        {/* Add your detailed content here */}
        <button
          onClick={onClose}
          className="absolute right-[30px] top-[30px] w-[36px]"
        >
          <img className="close-btn" src={closeBtn} alt="close"></img>
        </button>
        <p className="text-[#FA551D] text-[28px] font-bold text-center">
          Cash App Pay
        </p>
        {/* <Lottie options={defaultOptions} height={300} width={300} /> */}
        <div className="text-white flex flex-col mt-8 w-full justify-center items-center">
          <div className="w-[300px] relative">
            <img src="https://i.ibb.co/gVD2HQG/qr-code.png" alt="QR Code"></img>
            <div className="">
              <div className="absolute w-[300px] h-[4px] opacity-60 bg-[#FA551D] line"></div>
            </div>
          </div>
          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#FA551D",
              "&:hover": {
                backgroundColor: "#FA551D", // Optional: Changes the background color on hover to a darker red
              },
              color: "white",
              fontSize: "24px",
              borderRadius: "10px",
            }}
          >
            Reveal QR code
          </Button> */}
        </div>
        <div className="flex flex-col mt-10 bg-[#FFF2EE] rounded-[10px] p-8 items-center w-full h-fit">
          <p className="text-[18px] font-bold text-[#091C62]">
            Use{" "}
            <a
              className="text-[##091C62] opacity-90 underline"
              href="https://cash.app/"
            >
              Cash App
            </a>{" "}
            or your phone's camera to scan and pay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeComponent;
