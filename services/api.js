export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovie = async({ query } ) => {

    const endpoint = query ? 
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : 
    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const res = await fetch( endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if(!res.ok){
        throw new Error(`Failed to fetch movie: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.results;
} 

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Q3NGE2MjBjNGE0ZmUyNDA1YTA5MzVhOGQ0MzkxZSIsIm5iZiI6MTc1NDM3NDE3Ny44OTUsInN1YiI6IjY4OTFhMDIxMzEyZDM4ZWViZWI3Zjg3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gvos_6NJuN3f_l_RvK9TQ-JO9NeOvgI0so_YPCCu4qU'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

