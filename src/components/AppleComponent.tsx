import { useRef, useState } from "react";
import { Button, Box, Typography } from "@mui/material";

import closeBtn from "../assets/CloseBtn.svg";

const AppleComponent = ({ onClose }: { onClose: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden input element
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string); // Convert image to base64 URL
      };
      reader.readAsDataURL(file); // Read the image file
    }
  };
  return (
    <>
      <button
        onClick={onClose}
        className="absolute right-[30px] top-[30px] w-[36px]"
      >
        <img className="close-btn" src={closeBtn} alt="close"></img>
      </button>
      <p className="text-[#FA551D] text-[28px] font-bold text-center">
        Apple Pay
      </p>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Open Camera
      </Button>
      <input
        type="file"
        accept="image/*"
        capture="environment" // Open the camera on mobile devices
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input element
        onChange={handleFileChange} // Handle file selection
      />
      {imageSrc && (
        <Box mt={2}>
          <Typography variant="h6">Captured Image:</Typography>
          <img
            src={imageSrc}
            alt="Captured"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </Box>
      )}
    </>
  );
};

export default AppleComponent;
