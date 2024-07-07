import { useState, FC, KeyboardEvent, useEffect } from "react";
import { Button, Checkbox, TextField, IconButton, Grow } from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { addMinutes, format } from "date-fns";

// import SelectLabels from "./Rates";
import { useAppDispatch, useAppSelector } from "../redux";
import { fetchSession } from "../redux/slice/appReducer";

import risk from "../assets/Risk.gif";
import { formatMinutesToHHmm } from "../utils";

interface ParkingProps {
  plateNumber: string;
  setPlateNumber: (arg0: string) => void;
  duration: number;
  setDuraion: (arg0: number) => void;
  amount: number;
  setAmount: (arg0: number) => void;
  setTabValue: (arg0: string) => void;
}

const ParkingComponent: FC<ParkingProps> = ({
  plateNumber,
  setPlateNumber,
  duration,
  setDuraion,
  amount,
  setAmount,
  setTabValue,
}) => {
  const dispatch = useAppDispatch();
  const { lot, session } = useAppSelector(({ app }) => app);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent) => {
    plateNumber &&
      e.key === "Enter" &&
      dispatch(fetchSession({ lotId: lot._id, plate: plateNumber }));
  };

  const handlePayNow = () => {
    if (duration < lot.payTime) {
      setError(`You do not need to pay for less than ${lot.payTime} minutes`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError("");
      setTabValue("paying");
    }
  };

  useEffect(() => {
    setAmount(Math.round((duration * lot.hourlyRate) / 60));
  }, [duration]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <TextField
          sx={{
            color: "#fa551d",
            borderRadius: "10px",
            "& .MuiInputBase-root": {
              fontSize: 20,
              backgroundColor: "#fff2ee",
              borderRadius: "10px",
              boxShadow: "3px 5px 5px rgba(250, 85, 29, 0.3)",
              "& input": {
                padding: "10px 20px",
                color: "#fa551d",
              },
              "& input::placeholder": { color: "#94a3b8", opacity: 1 },
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPlateNumber("")}
              >
                {plateNumber ? <ClearIcon /> : <SearchIcon />}
              </IconButton>
            ),
          }}
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="License Plate"
          className="w-full"
          error={true}
          helperText={
            session._id
              ? session.status === "PAID"
                ? "You have already paid for your parking."
                : session.status !== "OK" &&
                  "You have already violated the rules of this parking lot."
              : ""
          }
        />
      </div>
      <Grow
        in={!!session._id && session.status === "OK"}
        style={{ transformOrigin: "0 0 0" }}
        {...(!!session._id && session.status === "OK" ? { timeout: 1000 } : {})}
      >
        <div>
          <input type="number" name="" id="" />
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
            <p className="text-[#091C62] text-left font-bold p-1">
              Duration ( HH:mm )
            </p>
            <div className="flex justify-center items-center gap-8 w-full lg:w-[400px]">
              <IconButton
                sx={{ "& svg": { color: "#FA551D" } }}
                onClick={() => setDuraion(duration > 0 ? duration - 30 : 0)}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <p className="flex flex-1 justify-center items-center h-10 bg-[#F5F5F5] border text-[#FA551D]">
                {formatMinutesToHHmm(duration)}
              </p>
              <IconButton
                sx={{ "& svg": { color: "#FA551D" } }}
                onClick={() => setDuraion(duration + 30)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          </div>
          <p className="text-red-600 text-sm">{error}</p>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
            <p className="text-[#091C62] text-left font-bold p-1">Start Date</p>
            <div className="flex justify-center items-center w-full lg:w-[400px] h-10 bg-[#F5F5F5] border">
              <p className="text-[#FA551D]">
                {format(new Date(), "MM/dd/yyyy HH:mm")}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
            <p className="text-[#091C62] text-left font-bold p-1">End Date</p>
            <div className="flex justify-center items-center w-full lg:w-[400px] h-10 bg-[#F5F5F5] border">
              <p className="text-[#FA551D]">
                {format(addMinutes(new Date(), duration), "MM/dd/yyyy HH:mm")}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
            <p className="text-[#091C62] text-left font-bold p-1">
              Hourly Rate
            </p>
            <div className="flex justify-center items-center w-full lg:w-[400px] h-10 bg-[#F5F5F5] border">
              <p className="text-[#FA551D]">${lot.hourlyRate}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
            <p className="text-[#091C62] text-left font-bold p-1">
              Parking Price
            </p>
            <div className="flex justify-center items-center w-full lg:w-[400px] h-10 bg-[#F5F5F5] border">
              <p className="text-[#FA551D]">${amount}</p>
            </div>
          </div>
          <div className="flex flex-col mt-4 items-center rounded-sm bg-[#fff2ee] p-4">
            <div className="flex justify-start w-full">
              <img src={risk} alt="Risk"></img>
            </div>
            <p className="text-2xl text-[#091C62]">
              Disclaimer ― Park at Your Own Risk
            </p>
            <div className="text-[20px] text-[#091C62] mt-4">
              This facility and or its agents are not responsible for any loss
              or damage which might be sustained by any vehicles while on this
              premises. Vehicles parked here are done so at vehicle owner’s own
              risk.
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Checkbox
              sx={{
                color: "#FA551D", // Color for the unchecked state
                "&.Mui-checked": {
                  color: "#FA551D", // Color for the checked state
                },
              }}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <button
              className="text-[#091C62] font-bold mx-5"
              onClick={() => setIsChecked(!isChecked)}
            >
              I accept the Terms of Service*
            </button>
          </div>

          <div className="mt-8 text-white w-full">
            <Button
              variant="contained"
              className="w-full"
              sx={{
                backgroundColor: "#FA551D",
                "&:hover": {
                  backgroundColor: "#FA551D", // Optional: Changes the background color on hover to a darker red
                },
              }}
              onClick={handlePayNow}
              disabled={!isChecked}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </Grow>
    </div>
  );
};

export default ParkingComponent;
