import { NextFunction, Request, Response } from 'express';
import { Metadata } from '../interfaces/metadata';

class MetaClass implements Metadata {
  attributes: any;
  description: string;
  name: string;
  animation_url: string;
  background_color: string;
  external_url: string;
  image: string;
  image_data: string;
  youtube_url: string;


  constructor(attributes: any, description: string, name: string, animation_url: string, background_color: string, external_url: string, image: string, image_data: string, youtube_url: string) {
    this.attributes = attributes;
    this.description = description;
    this.name = name;
    this.animation_url = animation_url;
    this.background_color = background_color;
    this.external_url = external_url;
    this.image = image;
    this.image_data = image_data;
    this.youtube_url = youtube_url;
  }
}
export async function sanitizeAddMetadataBody(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  // Using this to filter out fields that are not in our table schema
  const metadataKeys = Object.keys(new MetaClass());
  for(const key of Object.keys(req.body)) {
    if(!metadataKeys.includes(key)) {
      delete req.body[key];
    }
  }
  next();
}
