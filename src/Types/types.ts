export interface CountryCardType {
  name: CountryNameType;
  population: number;
  capital: string[];
  region: string;
  flags: FlagsType;
}
export interface CountryNameType {
  common: string;
  official: string;
}
interface FlagsType {
  png?: string;
  svg?: string;
}

export interface Country {
  name: CountryNameType;
  cca3: string;
  currencies?: any;
  capital?: string[];
  region: string;
  subregion: string;
  languages?: any;
  flags: FlagsType;
  population: number;
  tld: string[];
}
