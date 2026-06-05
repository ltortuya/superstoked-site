import type { SchemaTypeDefinition } from "sanity";
import { eventType } from "./event";
import { homePageType } from "./homePage";
import { partnerType } from "./partner";
import { testimonialType } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  eventType,
  homePageType,
  partnerType,
  testimonialType,
];
