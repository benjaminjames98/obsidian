import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { AirtableClientView } from "./ui-panes/AirtableClientView";

export default function ClientView(): JSX.Element {
  const app = useContext(AppContext);
  const [client, setClient] = React.useState(null);

  const clients = app.vault.getMarkdownFiles()
    .filter((file) => file.parent?.parent?.name === "Clients")
    .map((file) => {
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
              value={client}
              style={{ width: "100%" }}
      >
        {clients.map((client) => (
          <option value={client.name}>{client.name}</option>
        ))}
      </select>

      <h2>{client}</h2>
      <AirtableClientView client={client} />
      {/*<MattermostClientView client={client} />*/}
      {/*<XeroProjectsClientView client={client} />*/}
    </>
  );
}
