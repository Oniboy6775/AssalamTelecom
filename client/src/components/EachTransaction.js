import React, { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import moment from "moment";
import { useGlobalContext } from "../context/UserContext";

function EachTransaction(props) {
  const { isAdmin, isAgent } = useGlobalContext();
  const [showDetails, setShowDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});

  return (
    <>
      {showDetails && (
        <TransactionDetails
          details={transactionDetails}
          close={() => setShowDetails(false)}
        />
      )}

      <div className="md:max-h-[70vh] overflow-y-scroll  ">
        <table id="t01" className="table-auto hover:table-fixed m-auto">
          <thead className="bg-[var(--primary-500)] text-white ">
            <tr>
              <th>Network</th>
              <th>Status</th>
              {(isAdmin || isAgent) && <th>Profit</th>}
              {(isAdmin || isAgent) && <th>User</th>}
              <th>Amount</th>
              <th>Number</th>
              <th>Date</th>
              <th>Balance Before</th>
              <th>Balance After</th>
            </tr>
          </thead>
          {props.transactions.length > 1 ? (
            <tbody className="">
              {props.transactions.map((e) => {
                const balanceIncrease = e.balance_After > e.balance_Before;
                return (
                  <tr
                    onClick={() => {
                      setShowDetails(true);
                      setTransactionDetails(e);
                    }}
                    key={e._id}
                    className="text-xs even:bg-[#eee] hover:bg-black/20 whitespace-nowrap text-left "
                  >
                    <td className="text-xs py-4 capitalize">
                      {e.trans_Network}
                    </td>
                    <td
                      className={
                        e.trans_Status === "success"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {e.trans_Status}
                    </td>
                    {(isAdmin || isAgent) && (
                      <>
                        <td
                          className={
                            e.trans_profit > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          ₦{e.trans_profit ? e.trans_profit.toFixed(2) : 0.0}
                        </td>
                        <td className="text-xs">{e.trans_UserName}</td>
                      </>
                    )}

                    <td
                      className={`${
                        balanceIncrease ? "text-green-500" : "text-red-500"
                      }`}
                    >{`₦ ${balanceIncrease ? "+" : "-"}${e.trans_amount}`}</td>
                    <td>{e.phone_number}</td>
                    <td className="">{moment(e.createdAt).calendar()}</td>
                    {/* <td>{moment(e.createdAt).format("h:mm a MMM Do ")}</td> */}
                    <td>{`₦${e.balance_Before.toFixed(2)}`}</td>
                    <td>{`₦${e.balance_After.toFixed(2)}`}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <caption>No transactions found</caption>
          )}
        </table>
      </div>
    </>
  );
}

export default EachTransaction;
