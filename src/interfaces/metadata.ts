export interface Metadata {
  image?: string;
  image_data?: string;
  external_url?: string;
  description: string;
  name: string;
  attributes: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}

export interface Attribute {
  display_type?: DisplayType;
  trait_type?: string;
  value: string | number;
}

export enum DisplayType {
  DATE = 'date',
  NUMBER = 'number',
  BOOST_PERCENTAGE = 'boost_percentage',
  BOOST_NUMBER = 'boost_number',
}
