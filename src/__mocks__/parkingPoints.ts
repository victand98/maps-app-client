import { ParkingPointModel } from "@types";
import { v4 as uuid } from "uuid";

export const parkingPoints: ParkingPointModel.ParkingPointResponse[] = [
  {
    id: uuid(),
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    media: "https://picsum.photos/300/150",
    title: "Dropbox",
    totalDownloads: "594",
  },
  {
    id: uuid(),
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    media: "https://picsum.photos/300/150",
    title: "Medium Corporation",
    totalDownloads: "625",
  },
  {
    id: uuid(),
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    media: "https://picsum.photos/300/200",
    title: "Slack",
    totalDownloads: "857",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description:
      "Lyft is an on-demand transportation company based in San Francisco, California.",
    media: "https://picsum.photos/300/200",
    title: "Lyft",
    totalDownloads: "406",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description:
      "GitHub is a web-based hosting service for version control of code using Git.",
    media: "https://picsum.photos/300/200",
    title: "GitHub",
    totalDownloads: "835",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    media: "https://picsum.photos/300/200",
    title: "Squarespace",
    totalDownloads: "835",
  },
];
