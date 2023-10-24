export interface Movie {
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    popularity: number;
    release_date: string;
    title: string;
    video: boolean | string;
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}