import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzJhZjg3ODc2ZDc4N2FlMzI2Y2NhN2JlZmMxZmQ1NyIsIm5iZiI6MTc3MTgyMzY1NS44MDMsInN1YiI6IjY5OWJlMjI3NGNkMTM2NjNlMDZhM2U1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6YpWJu1zK91ftI5ZPZCAwecZtFnW59RqeN50I1zv0Yo'
  }
}); 