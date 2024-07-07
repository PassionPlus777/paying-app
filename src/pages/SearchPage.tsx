import { FC, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { List, ListItemButton, ListItemText } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux";
import { fetchLots, setLot } from "../redux/slice/appReducer";

import { LotType } from "../types";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff2ee", // Set background color
    color: "#fa551d",
    fontSize: 24,
    borderRadius: 30,
    boxShadow: "3px 5px 5px rgba(250, 85, 29, 0.3)", // Set box shadow
    paddingRight: 6,
    "& fieldset": {
      border: "none", // Remove border
    },
    "& input": {
      padding: "10px 5px 10px 20px", // Remove padding of input
    },
    "& i": {
      backgroundColor: "#fa551d",
      color: "white",
      padding: 10,
      borderRadius: 30,
    },
  },
});

const CustomList = styled(List)({
  backgroundColor: "#fff2ee",
  boxShadow: "3px 5px 5px rgba(250, 85, 29, 0.3)", // Set box shadow
  borderRadius: 10,
  marginTop: 10,
  maxHeight: 600,
  overflowY: "scroll",
  "& .MuiButtonBase-root": {
    width: "100%",
  },
});

const SearchPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { lots } = useAppSelector(({ app }) => app);

  const [resultLots, setResultLots] = useState<LotType[]>([]);

  useEffect(() => {
    dispatch(fetchLots());
  }, [dispatch]);

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    if (value) {
      setResultLots(
        lots.filter((lot) =>
          lot.siteCode.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setResultLots([]);
    }
  };

  const handleClick = (value: LotType) => {
    dispatch(setLot(value));
    navigate(`/payment`);
  };

  return (
    <>
      <CustomTextField
        placeholder="Lot Number"
        className="w-full"
        InputProps={{
          endAdornment: <i className="fa fa-search"></i>,
        }}
        variant="outlined"
        onChange={handleChangeInput}
      />
      {resultLots.length > 0 && (
        <CustomList>
          {resultLots.map((item, index) => (
            <ListItemButton key={index} onClick={() => handleClick(item)}>
              <ListItemText
                primary={
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
                    <p>
                      <span>Lot</span> : {item.siteCode}
                    </p>
                    <p>
                      <span>Address</span> : {item.address}
                    </p>
                  </div>
                }
              />
            </ListItemButton>
          ))}
        </CustomList>
      )}
    </>
  );
};

export default SearchPage;
