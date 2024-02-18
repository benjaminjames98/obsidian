import { App, PluginSettingTab, Setting } from "obsidian";
import TTSPlugin from "./index";

export interface TTSPluginSettings {
  AIRTABLE_API_KEY: string;
  AIRTABLE_BASE_ID: string;
}

export const TTS_DEFAULT_SETTINGS: TTSPluginSettings = {
  AIRTABLE_API_KEY: "",
  AIRTABLE_BASE_ID: ""
};

export default class TTSSettingsTab extends PluginSettingTab {
  plugin: TTSPlugin;

  constructor(app: App, plugin: TTSPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "TTS Plugin Settings" });

    new Setting(containerEl)
      .setName("Airtable API Key")
      .setDesc("Your Airtable API key")
      .addText(text =>
        text
          .setPlaceholder("API Key")
          .setValue(this.plugin.settings.AIRTABLE_API_KEY)
          .onChange(async (value) => {
            this.plugin.settings.AIRTABLE_API_KEY = value;
            await this.plugin.saveSettings();
          }));

    new Setting(containerEl)
      .setName("Airtable Base ID")
      .setDesc("Your Airtable Base ID")
      .addText(text =>
        text
          .setPlaceholder("Base ID")
          .setValue(this.plugin.settings.AIRTABLE_BASE_ID)
          .onChange(async (value) => {
            this.plugin.settings.AIRTABLE_BASE_ID = value;
            await this.plugin.saveSettings();
          }));
  }
}
