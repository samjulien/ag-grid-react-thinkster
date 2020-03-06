import { types } from "../types/columnTypes";

export default function columnReducer(state = {}, action) {
  switch (action.type) {
    case types.GROUP_COLUMN:
      return {
        columnDefs: [
          {
            colId: "athlete",
            field: "athlete"
          },
          {
            colId: "sport",
            field: "sport",
            rowGroup: true
          },
          {
            colId: "age",
            field: "age"
          },
          {
            colId: "year",
            field: "year"
          }
        ]
      };
    case types.CHANGE_COLUMNS:
      return {
        columnDefs: [
          {
            colId: "athlete",
            field: "athlete"
          },
          {
            colId: "age",
            field: "age"
          }
        ]
      };
    case types.UPDATE_HEADER_NAME:
      return {
        columnDefs: [
          {
            colId: "athlete",
            field: "athlete",
            headerName: "Athl"
          },
          {
            colId: "sport",
            field: "sport",
            headerName: "Sp"
          },
          {
            colId: "age",
            field: "age",
            headerName: "Age"
          },
          {
            colId: "year",
            field: "year",
            headerName: "Yr"
          }
        ]
      };
    default:
      return state;
  }
}
