import { Plugin, WorkspaceLeaf } from "obsidian";
import TTSView, { TTS_VIEW_TYPE } from "./TTSView";


export default class TTSPlugin extends Plugin {
  private view: TTSView;

  async onload(): Promise<void> {
    this.registerView(
      TTS_VIEW_TYPE,
      (leaf: WorkspaceLeaf) => (this.view = new TTSView(leaf))
    );

    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  onLayoutReady(): void {
    if (this.app.workspace.getLeavesOfType(TTS_VIEW_TYPE).length) {
      return;
    }

    this.app.workspace.getLeaf(false).setViewState({
      type: TTS_VIEW_TYPE
    });
  }
}
