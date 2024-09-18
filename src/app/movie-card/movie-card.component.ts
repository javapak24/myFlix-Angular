import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
    ) {} 

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Function to get all movies using FetchApiDataService
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function to alert genre
   * @param genre 
   */
  showGenreAlert(genre: any): void {
    alert(genre);
  }

  /**
   * Function to alert director
   * @param director 
   */
  showDirectorAlert(director: any): void {
    alert(director);
  }

  /**
   * Function to alert synopsis
   * @param synopsis 
   */
  showSynopsisAlert(synopsis: any): void {
    alert(synopsis);
  }

  /**
   * Function to add movie to favorites using FetchApiDataService
   * @param movieTitle 
   */
  addToFavorites(movieTitle: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .addFavoriteMovie(user.Username, movieTitle)
      .subscribe((res: any) => {
        console.log(res);
        this.getMovies();
      });
      this.snackBar.open("movie added to favorites", 'OK', {
        duration: 2000
     });
  }

  /**
   * Function to remove movie from favorites using FetchApiDataService
   * @param movieTitle 
   */
  removeFromFavorites(movieTitle: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .deleteFavoriteMovie(user.Username, movieTitle)
      .subscribe((res: any) => {
        console.log(res);
        this.getMovies();
      });
      this.snackBar.open("movie removed from favorites", 'OK', {
        duration: 2000
     });
  }

  isFavorite(movieId: string): boolean {
    const userFavorites: any = JSON.parse(
      localStorage.getItem('user') as any
    ).FavoriteMovies;
    console.log(userFavorites);
    return userFavorites.includes(movieId);
  }

  /**
   * Function to bring user to profile endpoint
   */
  myProfile(): void{
    this.router.navigate(['profile']);
  }
}
