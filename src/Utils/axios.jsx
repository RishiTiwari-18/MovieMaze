import axios from "axios";


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjI5MDc5OTU2ZDZlMDU3ZGVmNGFlNzEyMDhlM2RjMCIsIm5iZiI6MTczMzA0ODg0NS43OTgsInN1YiI6IjY3NGMzYTBkNTJhOTk1MWEwMDk4MTQ0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FqFHvpBvjL_QsBsEZB2NcLIAYL2puw_vN5aBGM7kQAI'
    }
})

export default instance;