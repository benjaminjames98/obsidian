import { ItemView } from "obsidian";
import React from "react";
import ClientView from "./ui/ClientView";
import ReactDOM from "react-dom";
import { AppContext } from "./AppContext";


export const TTS_VIEW_TYPE = "tts-view";

export default class TTSView extends ItemView {

  constructor(leaf: any) {
    super(leaf);
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
      <AppContext.Provider value={this.app}>
        <ClientView />
      </AppContext.Provider>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactDOM.render(reactComponent, (this as any).contentEl);
  }
}
