import React from 'react';
import { useState, useEffect } from 'react';
import formatTable from '../scripts/formatTable';

export const BalanceSheet = ({ balanceSheet }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (balanceSheet) {
      setColumns(balanceSheet.columns);
      setData(balanceSheet.data);
    }
  }, [balanceSheet]);

  if (!columns.length || !data.length) {
    return <div>Loading Balance Sheet...</div>;
  }

  return (
    <>
      <div className="financial-statement">
        <h2 className="financial-statement-title">Balance Sheet</h2>
        <table className="financial-statement-table">
          <tbody>
            {columns.map((columnName, columnIndex) => (
              <tr
                key={columnName}
                className={columnName === 'asOfDate' ? 'asOfDate-row' : ''}
              >
                <td className="left-column">{columnName}</td>
                {data.map(rowData => (
                  <td key={rowData[columnIndex]}>
                    {formatTable(rowData[columnIndex], columnName)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BalanceSheet;
