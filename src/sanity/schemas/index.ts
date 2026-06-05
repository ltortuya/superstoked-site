import type { SchemaTypeDefinition } from "sanity";
import { eventType } from "./event";
import { homePageType } from "./homePage";

export const schemaTypes: SchemaTypeDefinition[] = [eventType, homePageType];
