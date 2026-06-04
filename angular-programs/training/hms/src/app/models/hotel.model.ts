// // Matches your HotelResponseDTO exactly
// export interface HotelResponseDTO {
//   id: number;
//   name: string;
//   location: string;
//   description: string;
// }
export interface HotelResponseDTO {
  id: number;
  name: string;
  location: string;
  description: string;
}

// For create/update requests — adjust fields to match your backend DTO
export interface HotelRequestDTO {
  name: string;
  location: string;
  description: string;
}