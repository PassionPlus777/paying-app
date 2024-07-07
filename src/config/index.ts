import { Appearance, LotType, LprSessionData } from "../types";

export const defaultLotData: LotType = {
  _id: "",
  zone: "",
  token: "",
  cover: "",
  siteCode: "",
  url: "",
  address: "",
  hourlyRate: 0,
  payTime: 0,
  percentage: 0,
  payingApp: "",
  owners: [],
};

export const defaultSessionData: LprSessionData = {
  _id: "",
  lot: defaultLotData,
  camera1: "",
  camera2: "",
  plateNumber: "",
  plate1: "",
  plate2: "",
  vehicle1: "",
  vehicle2: "",
  entryTime: "",
  exitTime: "",
  status: "",
  noticeNumber: "",
  payLog: "",
  ticketCheck: false,
};

export const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#2687e8",
    colorBackground: "#FFFAF9",
    colorText: "#091C62",
  },
};
