import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/trending')
  async getTrending() {
    const trending = await this.movieService.getTrending();

    return trending;
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param() params) {
    const { id } = params;
    const recommendations = await this.movieService.getRecommendations(id);

    return recommendations;
  }

  @Get(':id/providers')
  async getWatchProviders(@Param() params) {
    const { id } = params;
    const providers = await this.movieService.getWatchProviders(id);

    return providers;
  }
}
