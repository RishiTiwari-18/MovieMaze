export { removetv } from "../Reducers/tvSlice";
import { loadtv } from "../Reducers/tvSlice";
import  axios from "../../Utils/axios";

export const asynctv = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
        let allDetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type =="Trailer"),
            watchProviders: watchProviders.data.results.IN,
        };

        dispatch(loadtv(allDetails))        
    } catch (error) {
        console.log("Error", error);
    }
}


