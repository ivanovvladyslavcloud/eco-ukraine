import { MonitoringStation } from "@/types/station";

export const stations: MonitoringStation[] = [
  {
    id: "1",
    name: "Zaporizhzhya Oleksandrovsckiy District",
    type: "urban",
    location: { lat: 47.820871675113885, lng: 35.1693706863379 },
  },
  {
    id: "2",
    name: "Kyiv Industrial District",
    type: "industrial",
    location: { lat: 50.43681775044824, lng: 30.40044855110319 },
  },
  {
    id: "3",
    name: "Zholkva",
    type: "rural",
    location: { lat: 50.06454669947593, lng: 23.96639834841638 },
  },
  {
    id: "4",
    name: "Kharkiv Industrial District",
    type: "industrial",
    location: { lat: 49.93227814777645, lng: 36.40261108480543 },
  },
  {
    id: "5",
    name: "Sosonka",
    type: "rural",
    location: { lat: 49.328667404343975, lng: 28.578400373930542 },
  },
  {
    id: "6",
    name: "Vinnytsa Zamostyansky District",
    type: "urban",
    location: { lat: 49.24298491970678, lng: 28.49478123643426 },
  },
  {
    id: "7",
    name: "Mykolaiv Zavodsky District",
    type: "industrial",
    location: { lat: 46.939457968486586, lng: 31.954802173789524 },
  },
];
