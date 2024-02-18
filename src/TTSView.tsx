import { App, ItemView } from "obsidian";
import React from "react";
import ClientView from "./ui/ClientView";
import ReactDOM from "react-dom";
import { AppContext } from "./AppContext";
import { TTSPluginSettings } from "./TTSSettingsTab";

export const TTS_VIEW_TYPE = "tts-view";

export default class TTSView extends ItemView {
  private readonly settings: TTSPluginSettings;


  constructor(leaf: any, app: App, settings: TTSPluginSettings) {
    super(leaf);
    this.app = app;
    this.settings = settings;
  }

  getViewType(): string {
    return TTS_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "TTS Plugin";
  }

  getIcon(): string {
    return "calendar-with-checkmark";
  }

  async onOpen(): Promise<void> {
    const reactComponent = (
      <AppContext.Provider value={{
        app: this.app,
        settings: this.settings
      }}>
        <ClientView />
      </AppContext.Provider>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactDOM.render(reactComponent, (this as any).contentEl);
  }
}
