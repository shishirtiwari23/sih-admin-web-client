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

function getColumns(navigate, handleModalOpen, handleEditModalOpen) {
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 150,
    },
    {
      field: "views",
      headerName: "Views",
      type: "number",
      width: 110,
    },
    {
      field: "likes",
      headerName: "Likes",
      type: "number",
      width: 110,
      renderCell: (params) => {
        return <span>{params?.row?.likes?.length}</span>;
      },
    },
    {
      field: "shares",
      headerName: "Shares",
      type: "number",
      width: 110,
    },
    {
      field: "savedBy",
      headerName: "Saved By",
      type: "number",
      width: 110,
      renderCell: (params) => {
        return <span>{params?.row?.savedByCount}</span>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 110,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
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
            Delete
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
  const { ARTICLE_API } = useContext(ArticleContext);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [articleId, setArticleId] = useState(""); //This is for modal, to identify which article to delete
  const navigate = useNavigate();

  async function getArticles() {
    const res = await ARTICLE_API.get("/all");
    if (res.status === 200) {
      const newRows = res.data.map((item) => ({ ...item, id: item._id }));
      console.log(newRows);
      setRows(newRows);
    } else {
      enqueueSnackbar("Failed To Load Articles", { variant: "error" });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setColumns(getColumns(navigate, handleModalOpen, handleEditModalOpen));
    getArticles();
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
  const { enqueueSnackbar } = useSnackbar();
  console.log(id);
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
            Are you sure, you want to delete this article?
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
  const { ARTICLE_API } = useContext(ArticleContext);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [categoryOptions, setCategoryOptions] = useState([
    {
      name: "Vlog",
      value: "vlog",
    },
    {
      name: "Makeup",
      value: "makeup",
    },
    {
      name: "Genz",
      value: "genz",
    },
    {
      name: "Skincare",
      value: "skincare",
    },
    {
      name: "Fitness",
      value: "fitness",
    },
    {
      name: "Couple",
      value: "couple",
    },
    {
      name: "Dance",
      value: "dance",
    },
    {
      name: "Comedy",
      value: "comedy",
    },
    {
      name: "Music",
      value: "music",
    },
  ]);
  const [category, setCategory] = useState([]);
  async function handleAddCategory(newCategory) {
    console.log(newCategory);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const reqBody = {
      ...values,

      createdBy: {
        id: "123",
        userType: "Admin",
      },
      slug: convertToSlug(values?.title),
    };
    const res = await ARTICLE_API.post("/update", reqBody);
    console.log(res);
    if (res?.data?.status === "success")
      enqueueSnackbar("Article Updated", { variant: "success" });
    else enqueueSnackbar("Failed To Update Article", { variant: "error" });
  }

  useEffect(() => {
    async function getArticle() {
      const res = await ARTICLE_API.get("/single", {
        params: {
          id,
        },
      });
      if (res.status === 200) {
        const newArticle = res.data;
        console.log(newArticle);
        setValues(newArticle);
      } else {
        enqueueSnackbar("Failed To Fetch Article", { variant: "error" });
      }
      console.log(res);
      setIsLoading(false);
    }
    getArticle();
  }, [ARTICLE_API, enqueueSnackbar, id]);
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
            height: "90vh",
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
            Edit Article
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
              <CreatableMultipleSelect
                required
                options={categoryOptions}
                width="100%"
                setValue={setCategory}
                id="brandSector"
                value={category}
                label={"Category"}
                onAddModalSubmit={handleAddCategory}
              />
              <TextField
                required
                id="thumbnail"
                value={values?.thumbnail}
                onChange={(e) => onValuesChange(e, setValues)}
                label="Thhumnail"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                multiline
                maxRows={16}
                minRows={4}
                margin="normal"
                id="content"
                value={values?.content}
                onChange={(e) => onValuesChange(e, setValues)}
                label="Content"
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
