import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { TFile } from "obsidian";
import { AirtableClientView } from "./ui-panes/AirtableClientView";

export default function ClientView(): JSX.Element {
  const { app, settings } = useContext(AppContext);
  const [client, setClient] = React.useState(null);

  const clients = app.vault.getFiles()
    .filter((file: TFile): boolean => file.parent?.parent?.name === "Clients")
    .map((file: TFile): { name: string, path: string } => {
      return {
        name: file.parent.name,
        path: file.parent.path
      };
    });

  // this should open client views in the current pane
  function clientSelected(clientName: string) {
    setClient(clientName);
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>TassieTech Client Portal</h1>
      <select onChange={(e) => clientSelected(e.target.value)}
              style={{ width: "100%" }}
      >
        {clients.map((client: any) => (
          <option value={client.name} key={client.name}>{client.name}</option>
        ))}
      </select>

      <h2>{client}</h2>
      <AirtableClientView
        clientName={client}
        api_key={settings.AIRTABLE_API_KEY}
        base_id={settings.AIRTABLE_BASE_ID}
      />
      {/*<MattermostClientView client={client} />*/}
      {/*<XeroProjectsClientView client={client} />*/}
    </>
  );
}
