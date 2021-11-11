import React, { useEffect, ReactElement } from 'react';
import {
  useTable,
  useFilters,
  useSortBy,
  useRowSelect,
  useExpanded,
  useGroupBy,
  useGlobalFilter,
} from 'react-table';
import './table.styles.scss';

import Spinner from '../spinner/spinner';
import GlobalFilter from '../common/forms/global-filter/global-filter';

interface TableProps {
  columns: any;
  data: [];
  hideAllColumns?: boolean;
  setSelectedRows?: (args: []) => void;
  hideCheckboxColumn?: boolean;
  isFetching?: boolean;
  isInfiniteScroll?: boolean;
  isLastPage?: boolean;
  options?: object;
  onClick?: () => void;
  filterDescription?: string;
}

const sortColumn = (column: any): string => {
  const sortDesc = column.isSortedDesc ? 'sort-desc' : 'sort-asc';
  return column.isSorted ? sortDesc : '';
};

export default function Table({
  columns,
  data,
  filterDescription,
  hideAllColumns = false,
  setSelectedRows,
  hideCheckboxColumn,
  isFetching = false,
  isInfiniteScroll = false,
  options = {},
  isLastPage = false,
  onClick,
}: TableProps): ReactElement {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds, globalFilter },
    setGlobalFilter,
  }: any = useTable(
    {
      columns,
      data,
      ...options,
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        if (hideCheckboxColumn) return [...columns];

        return columns;
      });
    }
  );

  useEffect(() => {
    if (setSelectedRows)
      setSelectedRows(selectedFlatRows.map((d: any) => d.original));
  }, [setSelectedRows, selectedRowIds, selectedFlatRows]);

  const translateColumn = (column: any): string => {
    const title =
      column.render('Header') && typeof column.render('Header') === 'string'
        ? column.render('Header').toString()
        : '';
    return typeof column.render('Header') === 'string'
      ? title
      : column.render('Header');
  };

  return (
    <div className='table-container'>
      {filterDescription && (
        <div className='filter-summary'>{filterDescription}</div>
      )}
      <div className='table'>
        {isFetching && !isInfiniteScroll && (
          <div className='table-overlay'>
            <div className='table-overlay-content'>
              <Spinner theme='white' />
              Updating
            </div>
          </div>
        )}
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
          <thead className={hideAllColumns ? 'hideAllColumns' : ''}>
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, idx: number) => (
                  <th
                    key={idx}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={sortColumn(column)}
                  >
                    {translateColumn(column)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell: any, idx: number) => {
                    return (
                      <td key={idx} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && !hideAllColumns && !isFetching && (
          <div className='no-data'>No data to display</div>
        )}
        {isFetching && isInfiniteScroll && (
          <div className='loading-infinite'>
            <Spinner theme='black' />
            Updating
          </div>
        )}
        {isLastPage && rows.length > 0 && (
          <div className='last-page'>-- No data to display --</div>
        )}
      </div>
    </div>
  );
}
