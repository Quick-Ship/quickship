import { EuiBasicTable, EuiBasicTableColumn } from "@elastic/eui";
// type User = {
//   id: number;
//   firstName: string | null | undefined;
//   lastName: string;
//   github: string;
//   dateOfBirth: Date;
//   online: boolean;
//   location: {
//     city: string;
//     country: string;
//   };
// };

export interface TableProps<T> {
  items: Array<any>;
  columns: Array<EuiBasicTableColumn<T>>;
  pageIndex?: number;
  setPageIndex?: (index: number) => void;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  totalItemCount?: number;
  itemIdToExpandedRowMap?: any;
  pageSizeOptions?: Array<number>;
  noItemsMessage?: string;
  isSelectable?: boolean;
  selection?: any;
  tableRef?: any;
  downloadButton?: any;
  itemId: string;
  pagination?: any;
  onChange?: ({ page, sort }: any) => void;
}

export const Table: React.FC<TableProps<any>> = ({
  columns,
  items,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  totalItemCount,
  itemIdToExpandedRowMap,
  pageSizeOptions,
  noItemsMessage,
  isSelectable,
  selection,
  tableRef,
  downloadButton,
  itemId,
  pagination,
  onChange
}) => {
  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable with expanding rows"
      items={items}
      itemId={itemId}
      isExpandable={true}
      hasActions={true}
      columns={columns}
      ref={tableRef}
      pagination={pagination}
      onChange={onChange}
      itemIdToExpandedRowMap={itemIdToExpandedRowMap}
      noItemsMessage={noItemsMessage}
      isSelectable={isSelectable}
      selection={selection}
    />
  );
};
