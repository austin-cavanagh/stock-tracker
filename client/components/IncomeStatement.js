import React, { useEffect, useState } from 'react';
import formatTable from '../scripts/formatTable';

const IncomeStatement = ({ incomeStatement }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setColumns([]);
    setData([]);

    if (incomeStatement) {
      setColumns(incomeStatement.columns);
      setData(incomeStatement.data);
    }
  }, [incomeStatement]);

  if (!columns.length || !data.length) {
    return <div>Loading Income Statement...</div>;
  }

  return (
    <>
      <div className="financial-statement">
        <h2 className="financial-statement-title">Income Statement</h2>
        <table className="financial-statement-table">
          <tbody>
            {columns.map((columnName, columnIndex) => (
              <tr
                key={crypto.randomUUID()}
                className={columnName === 'asOfDate' ? 'asOfDate-row' : ''}
              >
                <td className="left-column">{columnName}</td>
                {data.map(rowData => (
                  <td key={crypto.randomUUID()}>
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

export default IncomeStatement;
