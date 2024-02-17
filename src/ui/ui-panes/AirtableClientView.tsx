import React from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function AirtableClientView(props: { client: unknown }) {

  // for now, return "airtable client view {client}"

  return (
    <div>
      <h2>Airtable Client View</h2>
      <p>Client: {props.client}</p>
    </div>
  );

}
