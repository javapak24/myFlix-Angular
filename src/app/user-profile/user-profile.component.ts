import { Component,OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    // public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router,
    public snackBar: MatSnackBar) 
    { this.userData = JSON.parse(localStorage.getItem("user") || ""); }

 ngOnInit(): void {
  // this.getUser();
  this.getFavMovies();
 }

//  getUser(): void {
//   this.fetchApiData.getUser().subscribe((resp: any) => {
//     this.userData = {
//       ...resp,
//       id: resp._id,
//       password: this.userData.password,
//       token: this.userData.token
//     };
//     localStorage.setItem("user", JSON.stringify(this.userData));
//     console.log(this.userData);
//   });
// }

/**
 * Function to edit user using FetchApiDataService
 */
editUser(): void{
  this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((resp: any) => {
    this.userData = {
      ...resp,
      id: resp._id,
      password: this.userData.password,
      token: this.userData.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    console.log(this.userData);
  });
} 

// getUserFavoriteMovies(): void{
//   this.fetchApiData.getUserFavoriteMovies().subscribe((resp : any) => {
//     this.userData.favoriteMovies = resp.FavoriteMovies;
//     return this.userData.favoriteMovies;
// })
// }


showGenreAlert(genre: any): void {
  alert(genre);
}

showDirectorAlert(director: any): void {
  alert(director);
}

showSynopsisAlert(synopsis: any): void {
  alert(synopsis);
} 

/**
 * Function to get user's favorite movies using FetchApiDataService
 */
getFavMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.favoriteMovies = resp.filter((m : any) => {
      return this.userData.FavoriteMovies.includes(m._id);
    });
    console.log(this.favoriteMovies);
    return this.favoriteMovies;
  });
}

/**
 * Function to delete user using FetchApiDataService and then logout user
 */
deleteUser(): void{
  const user: any = JSON.parse(localStorage.getItem('user') as any);
  this.fetchApiData.deleteUser(user.Username).subscribe((resp: any) => {
    console.log(resp);
  })
  this.logoutUser();
}

// TODO: Implement favorite button
// addToFavorites(movieTitle: string): void {
//   const user: any = JSON.parse(localStorage.getItem('user') as any);
//   this.fetchApiData
//     .addFavoriteMovie(user.Username, movieTitle)
//     .subscribe((res: any) => {
//       console.log(res);
//       this.getMovies();
//     });
//     this.snackBar.open("movie added to favorites", 'OK', {
//       duration: 2000
//    });
// }

// TODO: Implement delete button
// removeFromFavorites(movieTitle: string): void {
//   const user: any = JSON.parse(localStorage.getItem('user') as any);
//   this.fetchApiData
//     .deleteFavoriteMovie(user.Username, movieTitle)
//     .subscribe((res: any) => {
//       console.log(res);
//       this.getMovies();
//     });
//     this.snackBar.open("movie removed from favorites", 'OK', {
//       duration: 2000
//    });
// }

// isFavorite(movieId: string): boolean {
//   const userFavorites: any = JSON.parse(
//     localStorage.getItem('user') as any
//   ).FavoriteMovies;
//   console.log(userFavorites);
//   return userFavorites.includes(movieId);
// }

/**
 * Function to logout user and return to welcome page
 */
logoutUser(): void{
  this.router.navigate(['welcome']);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

/**
 * Function to return to all movies page
 */
allMovies(): void{
  this.router.navigate(['movies']);
}

}