import React, { useEffect } from "react";
import {
  AirtableClientData,
  useAirtableClientsData
} from "../../hooks/AirtableHooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function AirtableClientView(props: {
  clientName: string,
  api_key: string,
  base_id: string
}) {

  // for now, return "airtable client view {client}"
  const { loading, clientsData } =
    useAirtableClientsData(
      props.api_key,
      props.base_id
    );

  const [clientData, setClientData] = React.useState(null);
  useEffect(() => {
    if (clientsData) {
      let clientData: AirtableClientData = clientsData.find(
        (client: AirtableClientData) => client.client === props.clientName
      );
      setClientData(clientData);
    }
  }, [props.clientName, clientsData]);

  if (loading) return <p>Loading...</p>;
  if (!clientsData) return <p>Error loading data</p>;
  if (!clientData) return <p>No data for this client</p>;

  // show a form based on AirTableClientData
  return (
    <div>
      <h1>Airtable</h1>
      <form>
        <label>
          Name:
          <input type="text" value={clientData.client} />
        </label>
        <label>
          Type:
          <input type="text" value={clientData.type} />
        </label>
        <label>
          IT Summary
          <textarea value={clientData.it_summary} />
        </label>
        <label>
          Notes
          <textarea value={clientData.notes} />
        </label>
        <label>
          Phone1
          <input type="text" value={clientData.phone_1} />
        </label>
        <label>
          Phone2
          <input type="text" value={clientData.phone_2} />
        </label>
        <label>
          Email
          <input type="text" value={clientData.email} />
        </label>
        <label>
          Address
          <textarea value={clientData.address} />
        </label>
      </form>
    </div>
  );

}
