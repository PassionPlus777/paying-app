import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { ParkingComponent, PayingComponent } from "../components";
import ParkingIcon from "../assets/ParkingIcon.png"; // Update the path to where your SVG is located
import PaymentIcon from "../assets/PaymentIcon.png"; // Update the path to where your SVG is located

import { useAppSelector } from "../redux";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { lot } = useAppSelector(({ app }) => app);

  const [tabValue, setTabValue] = useState("parking");
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [duration, setDuraion] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    !lot._id && navigate("/");
  }, [lot]);

  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "#FFAD92" }}>
          <TabList
            onChange={(_, value) => setTabValue(value)}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#FA551D", // Changes the indicator color to #FA551D
              },
              "& .MuiTab-root": {
                color: "grey", // Changes the default tab text color
                "&.Mui-selected": {
                  color: "#FA551D", // Changes the selected tab text color to #FA551D
                },
                "&:hover": {
                  color: "#FA551D", // Optional: Changes the hover color to #FA551D
                },
              },
            }}
          >
            <Tab
              value="parking"
              icon={<img src={ParkingIcon} width={28} alt="Parking" />}
              label="Parking"
            />
            <Tab
              disabled
              value="paying"
              icon={<img src={PaymentIcon} width={28} alt="Payment" />}
              label="Payment"
            />
          </TabList>
        </Box>
        <TabPanel value="parking">
          <ParkingComponent
            plateNumber={plateNumber}
            setPlateNumber={setPlateNumber}
            duration={duration}
            setDuraion={setDuraion}
            amount={amount}
            setAmount={setAmount}
            setTabValue={setTabValue}
          />
        </TabPanel>
        <TabPanel value="paying">
          <PayingComponent
            amount={amount}
            plateNumber={plateNumber}
            duration={duration}
          />
        </TabPanel>
      </TabContext>
      <div className="flex flex-col items-center">
        <div className="text-1xl mt-12">
          © 2024 CityParkLot. All rights reserved.
        </div>
        <div className="footer-link flex">
          <a
            href="https://stripe.com/legal/end-users"
            className="text-1xl text-[#091C62] mx-2 underline my-1"
          >
            Terms of Service
          </a>
          <a
            href="https://stripe.com/privacy"
            className="text-1xl text-[#091C62] mx-2 underline my-1"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </Box>
  );
};

export default PaymentPage;
