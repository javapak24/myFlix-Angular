import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showGenreAlert(genre: any): void {
    alert(genre);
  }

  showDirectorAlert(director: any): void {
    alert(director);
  }

  showSynopsisAlert(synopsis: any): void {
    alert(synopsis);
  }

  // TODO: Implement favorite button
  addToFavorites(movieTitle: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .addFavoriteMovie(user.Username, movieTitle)
      .subscribe((res: any) => {
        console.log(res);
        this.getMovies();
      });
  }

  // TODO: Implement delete button
  removeFromFavorites(movieTitle: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .deleteFavoriteMovie(user.Username, movieTitle)
      .subscribe((res: any) => {
        console.log(res);
        this.getMovies();
      });
  }

  isFavorite(movieId: string): boolean {
    const userFavorites: any = JSON.parse(
      localStorage.getItem('user') as any
    ).FavoriteMovies;
    console.log(userFavorites);
    return userFavorites.includes(movieId);
  }
}
