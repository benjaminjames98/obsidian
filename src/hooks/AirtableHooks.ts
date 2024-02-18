import { useEffect, useState } from "react";
import Airtable from "airtable";

export interface AirtableClientData {
  client: string;
  type: string;
  it_summary: string;
  notes: string;
  phone_1: string;
  phone_2: string;
  email: string;
  address: string;
}

function filterClientData(record: any): AirtableClientData {
  return {
    client: record.fields["Client"],
    type: record.fields["Type"],
    it_summary: record.fields["IT Summary"],
    notes: record.fields["Notes"],
    phone_1: record.fields["Phone 1"],
    phone_2: record.fields["Phone 2"],
    email: record.fields["Email"],
    address: record.fields["Address"]
  };
}

export function useAirtableClientsData(api_key: string, base_id: string): {
  loading: boolean,
  clientsData: AirtableClientData[]
} {

  const base = new Airtable({ apiKey: api_key }).base(base_id);

  const [loading, setLoading] = useState(true);
  const [clientsData, setClientsData]
    = useState<AirtableClientData[]>([]);

  useEffect(() => {
    const clientsDataStack: any[] = [];

    function processPage(records: any[], fetchNextPage: any) {
      clientsDataStack.push(...records);
      fetchNextPage();
    }

    function filterAndReturnResults(err: any) {
      if (err) {
        console.error(err);
      }

      const filteredClientData: AirtableClientData[]
        = clientsDataStack.map(filterClientData);

      setClientsData(filteredClientData);
      setLoading(false);
    }

    base("clients")
      .select({ view: "RAW", pageSize: 50 })
      .eachPage(processPage, filterAndReturnResults);
  }, []);

  return {
    loading: loading,
    clientsData: clientsData
  };
}
