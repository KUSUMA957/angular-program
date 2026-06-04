// // Your backend often wraps responses like: { data: T, code?: string, message?: string }
// // We'll keep these light and optional to accommodate both success and error bodies.

// export interface ApiResponseData<T> {
//   data: T;
//   code?: string;
//   message?: string;
// }

// // If you ever return { code, message, data? } (e.g., for create/update),
// // you can also keep this handy for future endpoints:
// export interface ApiResponse<T> {
//   code: string;
//   message: string;
//   data?: T;
// }

export interface ApiResponseData<T> {
  data: T;
  code?: string;
  message?: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data?: T;
}