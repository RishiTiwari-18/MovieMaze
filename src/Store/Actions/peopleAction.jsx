export { removepeople } from "../Reducers/peopleSlice";
import { loadpeople } from "../Reducers/peopleSlice";
import  axios from "../../Utils/axios";

export const asyncpeople = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedcredits = await axios.get(`/person/${id}/combined_credits`)

        let allDetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedcredits: combinedcredits.data,
        };

        dispatch(loadpeople(allDetails))        
    } catch (error) {
        console.log("Error", error);
    }
}


