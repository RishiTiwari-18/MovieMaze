export { removeMovie } from "../Reducers/movieSlice";
import { loadMovie } from "../Reducers/movieSlice";
import  axios from "../../Utils/axios";

export const asyncMovie = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
        let allDetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type =="Trailer"),
            watchProviders: watchProviders.data.results.IN,
        };

        dispatch(loadMovie(allDetails))        
    } catch (error) {
        console.log("Error", error);
    }
}


