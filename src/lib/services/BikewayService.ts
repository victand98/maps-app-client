import { httpClient } from "@lib";
import { BikewayModel } from "@types";

const BikewayService = {
  save: (data: BikewayModel.BikewayValues) =>
    httpClient.post("/bikeway/", data),
  update: (data: BikewayModel.BikewayValues, id: string) =>
    httpClient.put(`/bikeway/${id}`, data),
};

export { BikewayService };
