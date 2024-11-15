import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFeatures } from "@/reducers/studioSelector";
import { fetchAllFeatures } from "@/reducers/featuresReducer";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { visuallyHidden } from "@mui/utils";
import FormControl from "@mui/joy/FormControl";
import Autocomplete from "@mui/joy/Autocomplete";
import { IoMdSearch } from "react-icons/io";
import Button from "@mui/joy/Button";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import IconButton from "@mui/joy/IconButton";
import  { Link as LinkRoute } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import ModalAddFeature from "@/components/pages/admin/feature/ModalFeature";

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
    id: "featureName",
    numeric: false,
    disablePadding: false,
    label: "Feature Name",
  },
  {
    id: "icon",
    numeric: false,
    disablePadding: false,
    label: "Icon",
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

const FeatureHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rows = useSelector(selectFeatures) || [];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (rows.length === 0) {
      dispatch(fetchAllFeatures());
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
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
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
    navigate(`/administration/edit_studio/${id}`);
  }

  return (
    <div className="w-full">
      <div className="container mx-auto py-10 sm:py-12 space-y-6 sm:space-y-12 px-4 sm:px-10">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-5 xl:gap-0">
          <h1 className="text-[#D05858] font-bold text-5xl">
          Manage features
          </h1>
          <div className="flex gap-4 items-center">
            <FormControl id="free-solo-demo">
              <Autocomplete
                freeSolo
                startDecorator={<IoMdSearch />}
                size="lg"
                placeholder="Search"
                options={rows.map((row: any) => row.featureName)}
                sx={{
                  "--Input-radius": "15px",
                }}
              />
            </FormControl>
            {/*  to="/administration/create_feature"  component={LinkRoute} */}
            <Button
              color="danger"
              size="lg"
              sx={{
                borderRadius: "15px",
              }}
              onClick={() => setOpen(true)}
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
              "& tr > *:not(:first-of-type)": { textAlign: "center" , verticalAlign: "middle"},
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
                      onClick={(event) => handleClick(event, row.featureName)}
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
                      <td className="font-bold">{row.featureName}</td>
                      <td className="">
                        <Icon icon="mdi-light:home" />
                      </td>
                      <td className="flex justify-center items-center gap-4">
                        <IconButton variant="plain" color="danger">
                          <AiTwotoneDelete className="text-2xl text-red-500" />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" onClick={() => handleEdit(row.id)}>
                          <MdOutlineModeEditOutline  className="text-2xl"/>
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
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
        <ModalAddFeature open={open} setOpen={setOpen}/>
      </div>
    </div>
  );
}

export default FeatureHome
