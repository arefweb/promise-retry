import { useState, useEffect, useCallback } from "react";
import './App.css';

import { get, retryAllRequests } from "./services";

type TransactionsResponse = {
  transactions: {
    id: number,
    price: number,
    first_name: string,
    last_name: string,
    date: string,
  }[],
  totalCount: number,
}

type AppNameResponse = {
  appName: string,
}

function App() {
  const [transactions, setTransactions] = useState<
    TransactionsResponse["transactions"]
  >([]);
  const [appName, setAppName] = useState('~~~');
  const [shouldError, setshouldError] = useState(localStorage.getItem('shouldError') === 'true' ? true : false);

  const retryError = useCallback(() => {
    retryAllRequests();
  }, []);
  
  
  useEffect(() => {
    get<TransactionsResponse>({
      url: "/transactions",
      headers: {
        ...(shouldError && { "X-Custom": "error" }),
      },
    })
      .then(({ data }) => {
        console.log("data of transactions: ", data);
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });
    get<AppNameResponse>({
      url: "/app-name",
      headers: {
        ...(shouldError && { "X-Custom": "error" }),
      },
    })
      .then(({ data }) => {
        console.log("data of app-name: ", data);
        setAppName(data.appName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  return (
    <>
      <h1>{appName}</h1>
      <div style={{ display: "flex", gap: "32px" }}>
        <div>
          <div>
            <label htmlFor="errorCheck">Should return Error?</label>
            <input
              id="errorCheck"
              type="checkbox"
              checked={shouldError}
              onChange={(e) => {
                localStorage.setItem("shouldError", String(e.target.checked));
                setshouldError(e.target.checked);
              }}
            />
          </div>
          <button
            onClick={retryError}
            style={{
              border: "1px solid #eee",
              display: "block",
              marginTop: "12px",
            }}
          >
            Retry Previous
          </button>
        </div>
        <table
          style={{ borderCollapse: "collapse", border: "1px solid black" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(
              (trans) => {
                return (
                  <tr key={trans?.id}>
                    <td>{trans?.id}</td>
                    <td>{trans?.first_name}</td>
                    <td>{trans?.last_name}</td>
                    <td>{trans?.price}</td>
                    <td>
                      &nbsp; &nbsp;
                      {new Date(trans?.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App
