import { httpClient } from "@lib";
import { BikewayModel } from "@types";
import { Session } from "next-auth";

const BikewayService = {
  save: (data: BikewayModel.BikewayValues, session: Session) =>
    httpClient.post("/bikeway/", data, { params: { session } }),
  update: (
    data: Partial<BikewayModel.BikewayValues>,
    id: string,
    session: Session
  ) => httpClient.put(`/bikeway/${id}`, data, { params: { session } }),
};

export { BikewayService };
