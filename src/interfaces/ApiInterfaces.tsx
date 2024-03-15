export interface IToken {
    access_token: string;
    refresh_token: string;
  }
  //ApirError
  
  export interface ApiErrorResponse {
    Message: string;
    Error_description: string;
  }