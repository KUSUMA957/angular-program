// import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map, retry, tap } from 'rxjs/operators';
// import { HotelResponseDTO } from '../models/hotel.model';
// import { ApiResponseData } from '../models/api-response.model';

// // TIP: If you use environments, prefer:
// // import { environment } from '../../environments/environment';
// // private readonly baseUrl = `${environment.apiBaseUrl}/api/hotels`;

// @Injectable({ providedIn: 'root' })
// export class HotelService {
//   private readonly http = inject(HttpClient);
//   private readonly baseUrl = 'http://localhost:8080/api/hotels';

//   // --------- Helpers to extract data safely ----------
//   private extractArray<T>(res: unknown): T[] {
//     // Accept either { data: [...] } or bare [...]
//     const body: any = res;
//     if (Array.isArray(body)) return body as T[];
//     if (body && Array.isArray(body.data)) return body.data as T[];
//     if (body && Array.isArray(body.payload)) return body.payload as T[];
//     // If wrapper exists but data is missing or null, return empty array
//     return [];
//   }

//   private extractOne<T>(res: unknown): T {
//     // Accept either { data: {...} } or bare { ... }
//     const body: any = res;
//     if (body && body.data) return body.data as T;
//     if (body && body.payload) return body.payload as T;
//     return body as T; // best-effort
//   }

//   private handleError(error: HttpErrorResponse) {
//     // Prefer backend codes/messages if present
//     const code =
//       (error.error && (error.error.code || error.error?.errorCode)) ?? null;
//     const message =
//       (error.error && (error.error.message || error.error?.errorMessage)) ??
//       error.message ??
//       'Request failed';

//     const msg = code ? `(${code}) ${message}` : message;
//     console.error('[HotelService] HTTP error:', {
//       url: error.url,
//       status: error.status,
//       code,
//       message,
//       error
//     });
//     return throwError(() => msg);
//   }

//   // ------------------------- GETs -------------------------

//   /**
//    * GET /api/hotels/all
//    * Accepts either ApiResponseData<HotelResponseDTO[]> or bare HotelResponseDTO[]
//    */
//   getAll(): Observable<HotelResponseDTO[]> {
//     const url = `${this.baseUrl}/all`;
//     return this.http.get<unknown>(url).pipe(
//       tap(res => console.log('[HotelService] GET all raw:', res)),
//       retry(1),
//       map(res => this.extractArray<HotelResponseDTO>(res)),
//       catchError(this.handleError)
//     );
//   }

//   /**
//    * GET /api/hotels/{hotelId}
//    * Accepts either ApiResponseData<HotelResponseDTO> or bare HotelResponseDTO
//    */
//   getById(hotelId: number): Observable<HotelResponseDTO> {
//     const url = `${this.baseUrl}/${hotelId}`;
//     return this.http.get<unknown>(url).pipe(
//       tap(res => console.log('[HotelService] GET by id raw:', res)),
//       retry(1),
//       map(res => this.extractOne<HotelResponseDTO>(res)),
//       catchError(this.handleError)
//     );
//   }

//   /**
//    * GET /api/hotels/by-amenity/{amenityId}
//    * Accepts either ApiResponseData<HotelResponseDTO[]> or bare HotelResponseDTO[]
//    */
//   getByAmenity(amenityId: number): Observable<HotelResponseDTO[]> {
//     const url = `${this.baseUrl}/by-amenity/${amenityId}`;
//     return this.http.get<unknown>(url).pipe(
//       tap(res => console.log('[HotelService] GET by amenity raw:', res)),
//       retry(1),
//       map(res => this.extractArray<HotelResponseDTO>(res)),
//       catchError(this.handleError)
//     );
//   }

//   /**
//    * GET /api/hotels/location/{location}
//    * Accepts either ApiResponseData<HotelResponseDTO[]> or bare HotelResponseDTO[]
//    */
//   getByLocation(location: string): Observable<HotelResponseDTO[]> {
//     const encoded = encodeURIComponent(location.trim());
//     const url = `${this.baseUrl}/location/${encoded}`;
//     return this.http.get<unknown>(url).pipe(
//       tap(res => console.log('[HotelService] GET by location raw:', res)),
//       retry(1),
//       map(res => this.extractArray<HotelResponseDTO>(res)),
//       catchError(this.handleError)
//     );
//   }
// }

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { HotelRequestDTO, HotelResponseDTO } from '../models/hotel.model';
import { ApiResponseData } from '../models/api-response.model';

// TIP: If you use environments, prefer:
// import { environment } from '../../environments/environment';
// private readonly baseUrl = `${environment.apiBaseUrl}/api/hotels`;

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/hotels';

  // --------- Helpers to extract data safely ----------
  private extractArray<T>(res: unknown): T[] {
    const body: any = res;
    if (Array.isArray(body)) return body as T[];
    if (body && Array.isArray(body.data)) return body.data as T[];
    if (body && Array.isArray(body.payload)) return body.payload as T[];
    return [];
  }

  private extractOne<T>(res: unknown): T {
    const body: any = res;
    if (body && body.data) return body.data as T;
    if (body && body.payload) return body.payload as T;
    return body as T;
  }

  private handleError(error: HttpErrorResponse) {
    const code =
      (error.error && (error.error.code || error.error?.errorCode)) ?? null;
    const message =
      (error.error && (error.error.message || error.error?.errorMessage)) ??
      error.message ??
      'Request failed';

    const msg = code ? `(${code}) ${message}` : message;
    console.error('[HotelService] HTTP error:', {
      url: error.url,
      status: error.status,
      code,
      message,
      error
    });
    return throwError(() => msg);
  }

  // ------------------------- GETs -------------------------

  /** GET /api/hotels/all */
  getAll(): Observable<HotelResponseDTO[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<unknown>(url).pipe(
      tap(res => console.log('[HotelService] GET all raw:', res)),
      retry(1),
      map(res => this.extractArray<HotelResponseDTO>(res)),
      catchError(this.handleError)
    );
  }

  /** GET /api/hotels/{hotelId} */
  getById(hotelId: number): Observable<HotelResponseDTO> {
    const url = `${this.baseUrl}/${hotelId}`;
    return this.http.get<unknown>(url).pipe(
      tap(res => console.log('[HotelService] GET by id raw:', res)),
      retry(1),
      map(res => this.extractOne<HotelResponseDTO>(res)),
      catchError(this.handleError)
    );
  }

  /** GET /api/hotels/by-amenity/{amenityId} */
  getByAmenity(amenityId: number): Observable<HotelResponseDTO[]> {
    const url = `${this.baseUrl}/by-amenity/${amenityId}`;
    return this.http.get<unknown>(url).pipe(
      tap(res => console.log('[HotelService] GET by amenity raw:', res)),
      retry(1),
      map(res => this.extractArray<HotelResponseDTO>(res)),
      catchError(this.handleError)
    );
  }

  /** GET /api/hotels/location/{location} */
  getByLocation(location: string): Observable<HotelResponseDTO[]> {
    const encoded = encodeURIComponent(location.trim());
    const url = `${this.baseUrl}/location/${encoded}`;
    return this.http.get<unknown>(url).pipe(
      tap(res => console.log('[HotelService] GET by location raw:', res)),
      retry(1),
      map(res => this.extractArray<HotelResponseDTO>(res)),
      catchError(this.handleError)
    );
  }

  // ------------------- POST / PUT / DELETE -------------------

  /** POST /api/hotels  -> creates a hotel */
  create(payload: HotelRequestDTO): Observable<HotelResponseDTO> {
    const url = `${this.baseUrl}`;
    return this.http.post<unknown>(url, payload).pipe(
      tap(res => console.log('[HotelService] POST create raw:', res)),
      map(res => this.extractOne<HotelResponseDTO>(res)),
      catchError(this.handleError)
    );
  }
  

  /** PUT /api/hotels/{id} -> updates a hotel */
  update(hotelId: number, payload: HotelRequestDTO): Observable<HotelResponseDTO> {
    const url = `${this.baseUrl}/${hotelId}`;
    return this.http.put<unknown>(url, payload).pipe(
      tap(res => console.log('[HotelService] PUT update raw:', res)),
      map(res => this.extractOne<HotelResponseDTO>(res)),
      catchError(this.handleError)
    );
  }

  /** DELETE /api/hotels/{id} -> deletes a hotel */
  remove(hotelId: number): Observable<void> {
    const url = `${this.baseUrl}/${hotelId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log('[HotelService] DELETE ok:', hotelId)),
      catchError(this.handleError)
    );
  }
}