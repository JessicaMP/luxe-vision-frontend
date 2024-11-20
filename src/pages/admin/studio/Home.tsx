import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectStudios } from "@/selectors/studioSelector";
import { fetchStudios } from "@/reducers/studiosReducer";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Avatar from "@mui/joy/Avatar";
import { visuallyHidden } from "@mui/utils";
import FormControl from "@mui/joy/FormControl";
import Autocomplete from "@mui/joy/Autocomplete";
import { IoMdSearch } from "react-icons/io";
import Button from "@mui/joy/Button";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import IconButton from "@mui/joy/IconButton";
import { Link as LinkRoute } from "react-router-dom";
import { Link as LinkRoute } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function labelDisplayedRows({ from, to, count }: any) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
    textAlign: "center",
  },
  {
    id: "studioName",
    numeric: false,
    disablePadding: false,
    label: "Studio Name",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "specialty",
    numeric: false,
    disablePadding: false,
    label: "Specialty",
  },
  {
    id: "yearsOfExperience",
    numeric: false,
    disablePadding: false,
    label: "Experience",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

const EnhancedTableHead = (props: any) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <thead className="text-white bg-[#444243] rounded-t-md">
      <tr>
        <th className="flex justify-center items-center">
          <Checkbox
            color="danger"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                "aria-label": "select all desserts",
              },
            }}
            sx={{ verticalAlign: "sub" }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: "ascending", desc: "descending" }[order]
                  : undefined
              }
              className="text-center align-middle"
            >
              <Link
                underline="none"
                color="neutral"
                textColor="white"
                component="button"
                onClick={createSortHandler(headCell.id)}
                sx={{
                  fontWeight: "lg",
                  "& svg": {
                    transition: "0.2s",
                    transform:
                      active && order === "desc"
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  },
                  "&:hover": { "& svg": { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default function TableSortAndSelection() {
  const navigate = useNavigate();
  const rows = useSelector(selectStudios) || [];

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    // Cambiar el parámetro name por id
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  const handleEdit = (id: number) => {
    navigate(`/administration/edit_studio/${id}`);
  };
  };

  return (
    <div className="w-full">
      <div className="container mx-auto py-10 sm:py-12 space-y-6 sm:space-y-12 px-4 sm:px-10">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-5 xl:gap-0">
          <h1 className="text-[#D05858] font-bold text-5xl">
            List of photo studios
          </h1>
          <div className="flex gap-4 items-center">
            <FormControl id="free-solo-demo">
              <Autocomplete
                freeSolo
                startDecorator={<IoMdSearch />}
                size="lg"
                placeholder="Search"
                options={rows.map((row) => row.studioName)}
                sx={{
                  "--Input-radius": "15px",
                }}
              />
            </FormControl>
            <Button
              color="danger"
              size="lg"
              sx={{
                borderRadius: "15px",
              }}
              component={LinkRoute}
              to="/administration/create_studio"
            >
              Add
            </Button>
          </div>
        </div>
        <Sheet
          variant="outlined"
          sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
        >
          <Table
            aria-labelledby="tableTitle"
            hoverRow
            sx={{
              "--TableCell-headBackground": "transparent",
              "--TableCell-selectedBackground": (theme) =>
                theme.vars.palette.success.softBg,
              "--TableCell-height": "95px",
              "& tr > *:not(:first-of-type)": {
                textAlign: "center",
                verticalAlign: "middle",
              },
            }}
            size="lg"
            borderAxis="none"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <tbody>
              {[...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <tr
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      style={
                        isItemSelected
                          ? {
                              "--TableCell-dataBackground":
                                "var(--TableCell-selectedBackground)",
                              "--TableCell-headBackground":
                                "var(--TableCell-selectedBackground)",
                            }
                          : {}
                      }
                    >
                      <th
                        scope="row"
                        className="flex items-center justify-center gap-2"
                      >
                        <Checkbox
                          checked={isItemSelected}
                          slotProps={{
                            input: {
                              "aria-labelledby": labelId,
                            },
                          }}
                          sx={{ verticalAlign: "top" }}
                        />
                        <Avatar alt={row.studioName} src={row.profileImage} />
                      </th>
                      <th id={labelId} scope="row">
                        {row.id}
                      </th>
                      <td className="font-bold">{row.studioName}</td>
                      <td>{row.location?.country}</td>
                      <td className="space-y-2">
                        {row.studioSpecialties.slice(0, 2).map((item: any) => (
                          <p
                            key={item.id}
                            className="inline-block text-xs rounded-full bg-black bg-opacity-70 text-white py-1 px-2"
                          >
                            {item.specialty.specialtyName}
                          </p>
                        ))}
                        {row.studioSpecialties.length > 2 && (
                          <p className="inline-block text-xs rounded-full bg-black bg-opacity-70 text-white py-1 px-2">
                            +{row.studioSpecialties.length - 2}
                          </p>
                        )}
                      </td>
                      <td>
                        {row.yearsOfExperience}{" "}
                        {row.yearsOfExperience === 1 ? " year" : " years"}
                      </td>
                      <td className="flex justify-center items-center gap-4">
                        <IconButton variant="plain" color="danger">
                          <AiTwotoneDelete className="text-2xl text-red-500" />
                        </IconButton>
                        <IconButton
                          variant="plain"
                          color="neutral"
                          onClick={() => handleEdit(row.id)}
                        >
                          <MdOutlineModeEditOutline className="text-2xl" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography sx={{ textAlign: "center", minWidth: 80 }}>
                      {labelDisplayedRows({
                        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                        to: getLabelDisplayedRowsTo(),
                        count: rows.length === -1 ? -1 : rows.length,
                      })}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <RiArrowLeftSLine />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={
                          rows.length !== -1
                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                            : false
                        }
                        onClick={() => handleChangePage(page + 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <RiArrowRightSLine />
                      </IconButton>
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
      </div>
    </div>
  );
}
