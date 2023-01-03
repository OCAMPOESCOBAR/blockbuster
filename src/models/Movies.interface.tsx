export interface ISearch {
  Search: IMovie[];
  totalResults: string;
  Response: string;
}

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IErrorResponse {
  Response: string;
  Error: string;
}


export interface IMovieAdd {
  count: number;
  id: string;
  option: string;
  poster: string;
  rentDate: string;
  title: string;
  type: string;
  year: string;
}