import { SortByOptions } from "./BaseItemSelection";
import React from "react";
interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  sortBy: SortByOptions;
  setSortBy: (sortByOption: SortByOptions) => void;
  sortOption_ASC: SortByOptions;
  sortOption_DESC: SortByOptions;
}

const TableData: React.FunctionComponent<Props> = ({
  setSortBy,
  sortBy,
  sortOption_ASC,
  sortOption_DESC,
  text,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`table data ${restProps.className}`}
      onClick={() => {
        setSortBy(
          sortBy === sortOption_DESC ? sortOption_ASC : sortOption_DESC
        );
      }}
      style={{
        textDecoration:
          sortBy === sortOption_DESC
            ? "overline"
            : sortBy === sortOption_ASC
            ? "underline"
            : undefined
      }}
    >
      {text}
    </button>
  );
};

export default TableData;
