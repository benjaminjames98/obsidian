import React, { createContext } from "react";
import { App } from "obsidian";

export interface ttsApp {
  app: App;
  settings: {
    AIRTABLE_API_KEY: string;
    AIRTABLE_BASE_ID: string;
  };
}

export const AppContext: React.Context<ttsApp> = createContext<ttsApp>({
  app: undefined,
  settings: {
    AIRTABLE_API_KEY: "",
    AIRTABLE_BASE_ID: ""
  }
});
