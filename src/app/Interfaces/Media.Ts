export interface IMovie {
  _id:             number;
  genres:          string[];
  title:           string;
  overview:        string;
  poster_path:     string;
  release_date:    string;
  youtube_trailer: string;
  sources:         ISource[];
  type:string;
}

export interface ISource {
  source: string;
  link:   string;
  type:   string;
}


export interface IShow{
  _id:number;
  genres:string[];
  title:string;
  overview:string;
  poster_path:string;
  first_aired:string;
  youtube_trailer:string;
  sources:ISource[];
  type:string;


}
