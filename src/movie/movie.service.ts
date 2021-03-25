import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class MovieService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.MOVIE_API_URI;
    this.apiKey = process.env.MOVIE_API_TOKEN;
  }

  async getTrending() {
    const response = await fetch(
      `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}&language=pt-BR`,
    );
    const trending = await response.json();

    return trending;
  }

  async getRecommendations(id: number) {
    const response = await fetch(
      `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=pt-BR`,
    );
    const recommendations = await response.json();

    return recommendations;
  }

  async getWatchProviders(id: number) {
    const response = await fetch(
      `${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}&language=pt-BR`,
    );
    const providers = await response.json();

    return providers.results.BR;
  }
}
