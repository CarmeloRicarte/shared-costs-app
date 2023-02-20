import './CustomTable.css';

import { useState } from 'react';

import { ObjetoGenerico } from '../../@types/app';

interface CustomTableProps {
  data: Array<ObjetoGenerico<any>>;
  columns: CustomTableColumn[];
  perPage?: number;
  actions?: CustomTableAction[];
}

interface CustomTableColumn {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface CustomTableAction {
  label: string;
  onClick: () => void;
}

export function CustomTable({
  data,
  columns,
  perPage = 10,
  actions,
}: CustomTableProps) {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className='table-container'>
      <table className='table'>
        <caption>
          {actions != null && (
            <div className='table-div-action-buttons'>
              {actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  onClick={() => {
                    action.onClick();
                  }}
                  className='table-action-button'
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {column.render != null
                    ? column.render(row[column.key])
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => {
            setPage((prevPage) => prevPage - 1);
          }}
          disabled={page === 1}
          className='pagination-button'
        >
          Anterior
        </button>
        <button
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
          }}
          disabled={endIndex >= data.length}
          className='pagination-button'
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
