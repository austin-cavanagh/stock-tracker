import React from 'react';
import formatTable from '../scripts/formatTable';

const IncomeStatement = ({ incomeStatement }) => {
  const { columns, data } = incomeStatement;

  return (
    <>
      <div className="financial-statement">
        <h2 className="financial-statement-title">Income Statement</h2>
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

export default IncomeStatement;
