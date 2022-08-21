import { useContext, useEffect, useState } from "react";
import styles from "./Manage.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArticleContext, convertToSlug, onValuesChange } from "../../../utils";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { CreatableMultipleSelect } from "../../../components";
import { LIVE_API } from "../Add/Add";

function getColumns(navigate, handleModalOpen, handleEditModalOpen) {
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
    },
    {
      field: "views",
      headerName: "Views",
      type: "number",
      width: 110,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 110,
    },
    {
      field: "view",
      headerName: "View",
      width: 90,
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              handleEditModalOpen(params?.row?.id);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              handleModalOpen(params?.row?.id);
            }}
            color="error"
          >
            Remove
          </Button>
        );
      },
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];
  return columns;
}
const Manage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [articleId, setArticleId] = useState(""); //This is for modal, to identify which article to delete
  const navigate = useNavigate();

  function pushSnackbar(msg, variant, time) {
    if (variant) {
      enqueueSnackbar(msg, { variant });
      setTimeout(() => {
        closeSnackbar();
      }, time);
    } else {
      enqueueSnackbar(msg);
      setTimeout(() => {
        closeSnackbar();
      }, 5000);
    }
  }

  useEffect(() => {
    async function getAllLiveStreams() {
      try {
        const res = await LIVE_API.get("/all");
        const newRows = res?.data.map((item) => ({ ...item, id: item._id }));
        setRows(newRows);
        setIsLoading(false);
      } catch (error) {
        pushSnackbar("Unable to get all livestreams", "error");
      }
    }
    setColumns(getColumns(navigate, handleModalOpen, handleEditModalOpen));
    getAllLiveStreams();
  }, []);
  function handleModalOpen(id) {
    setArticleId(id);
    setIsModalOpen(true);
  }
  function handleEditModalOpen(id) {
    setArticleId(id);
    setIsEditModalOpen(true);
  }
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Box sx={{ height: 550, width: "100%" }}>
        <DataGrid
          onRowClick={(params) => navigate("/articles/" + params?.id)}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <ConfirmationModal
        id={articleId}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
      <EditModal
        id={articleId}
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
      />
    </div>
  );
};

const ConfirmationModal = ({ id, open, setOpen }) => {
  const { ARTICLE_API } = useContext(ArticleContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log(id);

  function pushSnackbar(msg, variant, time) {
    if (variant) {
      enqueueSnackbar(msg, { variant });
      setTimeout(() => {
        closeSnackbar();
      }, time);
    } else {
      enqueueSnackbar(msg);
      setTimeout(() => {
        closeSnackbar();
      }, 5000);
    }
  }

  async function handleDelete() {
    const res = await ARTICLE_API.delete("/delete", {
      params: {
        id,
      },
    });
    if (res.status === 200) {
      console.log("hello");
      enqueueSnackbar("Article Deleted Successfully", { variant: "success" });
    } else {
      console.log("jsdfkdjs");

      enqueueSnackbar("Failed To Delete Articles", { variant: "error" });
    }
  }
  return (
    <div className={styles.modal}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography ariant="h5" component="div">
            Are you sure, you want to remove this livestream?
          </Typography>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Button
              onClick={() => handleDelete()}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const EditModal = ({ id, open, setOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function pushSnackbar(msg, variant, time) {
    if (variant) {
      enqueueSnackbar(msg, { variant });
      setTimeout(() => {
        closeSnackbar();
      }, time);
    } else {
      enqueueSnackbar(msg);
      setTimeout(() => {
        closeSnackbar();
      }, 5000);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    // const reqBody = {
    //   ...values,
    //   id,
    //   content: values?.content || {},
    //   // createdBy: {
    //   //   id: "123",
    //   //   userType: "Admin",
    //   // },
    //   // slug: convertToSlug(values?.title),
    // };
    // console.log(reqBody);
    // const res = await ARTICLE_API.patch("/update", reqBody);
    // console.log(res);
    // if (res?.data?.status === "success")
    //   enqueueSnackbar("Article Updated", { variant: "success" });
    // else enqueueSnackbar("Failed To Update Article", { variant: "error" });
  }

  useEffect(() => {
    // async function getArticle() {
    //   const res = await ARTICLE_API.get("/single", {
    //     params: {
    //       id,
    //     },
    //   });
    //   if (res.status === 200) {
    //     const newArticle = res.data;
    //     console.log(newArticle);
    //     setValues(newArticle);
    //   } else {
    //     enqueueSnackbar("Failed To Fetch Article", { variant: "error" });
    //   }
    //   console.log(res);
    //   setIsLoading(false);
    // }
    // getArticle();
  }, []);
  return (
    <div className={styles.modal}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            // height: "90vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            overflow: "auto",
            p: 4,
          }}
        >
          <Typography sx={{ marginBottom: "1rem" }} variant="h5" component="h4">
            Edit Livestream
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={submitHandler} action="">
              <TextField
                required
                margin="normal"
                id="title"
                value={values?.title}
                onChange={(e) => onValuesChange(e, setValues)}
                label="Title"
                variant="outlined"
              />
              <TextField
                required
                id="videoUrl"
                value={values?.videoUrl}
                onChange={(e) => onValuesChange(e, setValues)}
                label="Link"
                margin="normal"
                variant="outlined"
              />
              <Button variant="contained" type="submit">
                Update
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Manage;
