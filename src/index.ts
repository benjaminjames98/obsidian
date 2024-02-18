import { Plugin, WorkspaceLeaf } from "obsidian";
import TTSView, { TTS_VIEW_TYPE } from "./TTSView";
import TTSSettingsTab, {
  TTS_DEFAULT_SETTINGS,
  TTSPluginSettings
} from "./TTSSettingsTab";


export default class TTSPlugin extends Plugin {
  view: TTSView;
  settings: TTSPluginSettings;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.addSettingTab(new TTSSettingsTab(this.app, this));

    this.registerView(
      TTS_VIEW_TYPE,
      (leaf: WorkspaceLeaf) => (this.view = new TTSView(leaf, this.app, this.settings))
    );

    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, TTS_DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
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
