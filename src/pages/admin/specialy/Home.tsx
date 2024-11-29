import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSpecialties } from "@/selectors/studioSelector";
import { fetchSpecialties } from "@/reducers/specialtiesReducer";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { visuallyHidden } from "@mui/utils";
import FormControl from "@mui/joy/FormControl";
import Autocomplete from "@mui/joy/Autocomplete";
import { IoMdSearch } from "react-icons/io";
import Button from "@mui/joy/Button";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import IconButton from "@mui/joy/IconButton";
import ModalAddFeature from "@/components/pages/admin/feature/ModalFeature";
import { addFeature, updateFeature } from "@/reducers/featuresReducer";
import Snackbar from "@mui/joy/Snackbar";

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
    id: "specialtyName",
    numeric: false,
    disablePadding: false,
    label: "Specialty Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
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

const SpecialyHome = () => {
  const dispatch = useDispatch();
  const rows = useSelector(selectSpecialties) || [];
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [feature, setFeature] = useState({});
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    if (rows.length === 0) {
      dispatch(fetchSpecialties());
    }
  }, [dispatch, rows.length]);

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
  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setEdit(true);
    setOpen(true);
    const featureData = rows.find((row: any) => row.id === id);
    setFeature(featureData);
  };

  const handleAdd = () => {
    setOpen(true);
    setEdit(false);
  };

  const handleSave = async (form: any) => {
    if (isEdit) {
      try {
        const resultAction = await dispatch(updateFeature(form));
        if (updateFeature.fulfilled.match(resultAction)) {
          const response = resultAction.payload;
          setFeature(response);
          setOpen(false);
          setOpenToast(true);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
      return;
    }
    try {
      const resultAction = await dispatch(addFeature(form));
      if (addFeature.fulfilled.match(resultAction)) {
        const response = resultAction.payload;
        setFeature(response);
        setOpen(false);
        setOpenToast(true);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto py-10 sm:py-12 space-y-6 sm:space-y-12 px-4 sm:px-10">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-5 xl:gap-0">
          <h1 className="text-[#D05858] font-bold text-5xl">
            Manage specialties
          </h1>
          <div className="flex gap-4 items-center">
            <FormControl id="free-solo-demo">
              <Autocomplete
                freeSolo
                startDecorator={<IoMdSearch />}
                size="lg"
                placeholder="Search"
                options={rows.map((row: any) => row.specialtyName)}
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
              onClick={handleAdd}
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
              "& td > *:not(:first-of-type)": {
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
                .map((row: any, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <tr
                      onClick={(event) => handleClick(event, row.specialtyName)}
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
                      </th>
                      <th id={labelId} scope="row">
                        {row.id}
                      </th>
                      <td className="font-bold">{row.specialtyName}</td>
                      <td className="text-sm">{row.description}</td>
                      <td className="">
                        <img
                          src={
                            (row.image && row.image) ||
                            URL.createObjectURL(row.image)
                          }
                          alt={row.specialtyName}
                          style={{
                            width: "auto",
                            height: "auto",
                            maxHeight: "100px",
                            borderRadius: "4px",
                          }}
                          className="mx-auto"
                        />
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
                <td colSpan={6}>
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
        <ModalAddFeature
          open={open}
          setOpen={setOpen}
          onSave={handleSave}
          isEdit={isEdit}
          feature={feature}
        />
        <Snackbar
          autoHideDuration={4000}
          open={openToast}
          variant="soft"
          color="success"
          onClose={(_, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setOpenToast(false);
          }}
        >
          {isEdit === true ? "Update feature" : "New feature created"}:{" "}
          <span className="font-bold"> {feature.specialtyName}</span>
        </Snackbar>
      </div>
    </div>
  );
};

export default SpecialyHome;
