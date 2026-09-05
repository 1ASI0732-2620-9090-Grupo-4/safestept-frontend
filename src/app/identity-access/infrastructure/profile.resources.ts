export interface ProfileResource {
  id: number;
  fullName: string;
  email: string;
  streetAddress: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;
}

