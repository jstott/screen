import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../config';

export interface TMDBResponse<T = any> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  original_title: string;
  original_language: string;
  poster_path: string | null;
  genre_ids: number[];
  adult: boolean;
  release_date: string;
  backdrop_path: string | null;
  video: boolean;
  vote_count: number;
  vote_average: number;
  popularity: number;
}
export interface TV {
  id: number;
  name: string;
  overview: string;
  original_name: string;
  original_language: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path: string | null;
  first_air_date: string;
  origin_country: string[];
  vote_count: number;
  vote_average: number;
  popularity: number;
}

export type MediaType = 'movie' | 'tv' | 'person';
export interface Person {
  popularity: number;
  id: number;
  vote_average: number;
  name: string;
  profile_path: string;
  adult: string;
  known_for: Media;
}

export interface SearchParams {
  page?: number;
  language?: string;
  include_adult?: boolean;
  region?: string;
  search_type?: 'phase' | 'ngram';
}

export type Media =
  ({ media_type: 'movie' } & Movie) |
  ({ media_type: 'tv' } & TV) |
  ({ media_type: 'person' } & Person);

export class TMDB {
  private httpClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 3000,
    params: {
      api_key: this.apikey,
    },
  });

  constructor(private apikey: string) {
  }

  get<T = any>(query: string, config?: AxiosRequestConfig) {
    return this.httpClient.get<T>(query, config);
  }

  async search<T = Media>(query: string, searchParams: SearchParams = { include_adult: false }, endpoint: 'movie' | 'tv' | 'person' | 'multi' = 'multi') {
    const result = await this.get<TMDBResponse<T>>('/search/' + endpoint, { params: { query, ...searchParams }});
    return result.data;
  }

  searchMovies(query: string, searchParams: SearchParams = {}) {
    return this.search<Movie>(query, searchParams, 'movie');
  }

  searchTv(query: string, searchParams: SearchParams = {}) {
    return this.search<TV>(query, searchParams, 'tv');
  }

  searchPeople(query: string, searchParams: SearchParams = {}) {
    return this.search<Person>(query, searchParams, 'person');
  }

  // private async refreshToken() {
  //   const response = await this.httpClient.get<TokenResponse>('/refresh_token');
  //   console.log('new token!', response);
  //   this.setHttpToken(response.data.token);
  // }

  // private setHttpToken(token: string) {
  //   this.httpClient.defaults.headers.Authorization = 'Bearer ' + token;

  //   if (this.settings.refreshToken) {
  //     this.refreshTimer = setTimeout(() => this.refreshToken(), this.settings.refreshToken);
  //   }
  // }
}

export default new TMDB(config.tmDbApikey);