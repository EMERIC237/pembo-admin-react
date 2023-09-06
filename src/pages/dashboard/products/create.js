import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// Step 1: Use dynamic imports for the Editor component
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  loading: () => <p>Loading Editor...</p>,
  ssr: false,
});

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ProductCreate = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [continueSelling, setContinueSelling] = useState(false);

  // For the rich text editor
  const [editorState, setEditorState] = useState(null);
  const handleEditorStateChange = (state) => setEditorState(state);

  const [productImage, setProductImage] = useState(null);

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProductImage(file);
    }
};
  const handleSubmit = () => {
    const productData = {
      name: productName,
      description: productDescription,
      categories: [selectedCategory],
      price: price,
      oldPrice: oldPrice,
      // ... other fields can be added similarly
    };
    console.log(productData);
    // Send productData to your backend.
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create a new product
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Dashboard {">"} Products {">"} Create
      </Typography>

      <Card variant="outlined" style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6">Basic details</Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                wrapperClassName="editorWrapper"
                editorClassName="editorInner"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Image upload logic will be placed here. */}
      <Card variant="outlined" style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6">Product Image</Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" color="primary">
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
              {productImage && <p>{productImage.name}</p>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Pricing details */}
      <Card variant="outlined" style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6">Pricing</Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Old Price"
                variant="outlined"
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={continueSelling}
                    onChange={() => setContinueSelling(!continueSelling)}
                  />
                }
                label="Keep selling when stock is empty"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Category details */}
      <Card variant="outlined" style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6">Category</Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3} justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined" color="secondary" style={{ marginRight: "10px" }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

ProductCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductCreate;
