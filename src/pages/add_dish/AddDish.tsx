import "./AddDish.scss";
import {
  TextField,
  InputLabelProps,
  Theme,
  Fab,
  Alert,
  AlertColor,
  Snackbar,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import ImagePickerContainer from "../../components/dish/ImagePicker";
import { useEffect, useState } from "react";
import AddCategory from "../../components/dish/AddCategory";
import { Dish, FoodCategory, Category } from "../../firebase/store/types";
import { v1 } from "uuid";
import { generateDishDescription, validateDish } from "../../utils/dish_helper";
import { firestore, store } from "../../firebase/client";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  categoriesFetched,
  categoryDishIncreased,
} from "../../store/categories_slice";
import {
  getCategories,
  increaseCategoryDishesCount,
} from "../../firebase/store/categories";

export default function AddDish() {
  const _dish: Dish = {
    id: v1(),
    name: "",
    subtitle: "",
    dishDescription: "",
    dishImages: [],
    rating: {},
    categoryId: [],
    addDate: Date.now(),
  };
  const [openSnackbar, setSnackOpen] = useState<boolean>(false);
  const [snackbarColor, setSnackColor] = useState<AlertColor>("success");
  const [snackbarEvent, setSnackEvent] = useState<string>("");
  const [dish, setDish] = useState<Dish>(_dish);
  const [steps, setSteps] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const _categories = useAppSelector((state) =>
    state.store.category.categories.map(mapToCategory)
  );

  useEffect(() => {
    async function fetch() {
      if (_categories.length !== 0) {
        setCategories(_categories);
        setLoading(false);
      } else {
        setLoading(true);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.map(mapToCategory));
        dispatch(categoriesFetched(fetchedCategories));
        setLoading(false);
      }
    }
    fetch();
  }, []);

  function mapToCategory(category: FoodCategory) {
    const _category: Category = {
      id: category.id,
      name: category.name,
      isSelected: false,
    };
    return _category;
  }

  const resetDish = () => {
    const newDish: Dish = {
      id: v1(),
      name: "",
      subtitle: "",
      dishDescription: "",
      dishImages: [],
      rating: {},
      categoryId: [],
      addDate: Date.now(),
    };
    setDish(newDish);
    setIngredients("");
    setSteps("");
    setCategories(
      categories.map((category) => {
        category.isSelected = false;
        return category;
      })
    );
  };

  //add dish to cloud firestore
  const addDish = async () => {
    const dishDescription = generateDishDescription({
      ingredients,
      description: steps,
      dishImages: dish!.dishImages,
    });
    const addedDish = { ...dish! };
    addedDish.dishDescription = dishDescription;
    const ref = firestore.doc(store, "dishes", addedDish.id);
    const dishValidationError = validateDish(addedDish);
    if (dishValidationError) {
      setSnackColor("error");
      setSnackEvent(dishValidationError);
      setSnackOpen(true);
    } else {
      await firestore
        .setDoc(ref, { ...addedDish })
        .then(async () => {
          const result = await increaseCategoryDishesCount(
            addedDish.categoryId
          );
          if (result) {
            dispatch(
              categoryDishIncreased({ categoryId: addedDish.categoryId })
            );
          }
          setSnackColor("success");
          setSnackEvent("Dish is added Successfully!");
          setSnackOpen(true);
          resetDish();
        })
        .catch((err) => {
          setSnackColor("error");
          setSnackEvent(`${err}`);
          setSnackOpen(true);
        });
    }
  };

  const updateCategories = (category: Category) => {
    let updatedCategory: Category = {
      ...category,
    };
    updatedCategory.isSelected = !category.isSelected;
    setCategories(
      categories.map((_category) =>
        _category.id === updatedCategory.id ? updatedCategory : _category
      )
    );
    const updatedDish = { ...dish! };
    if (!updatedDish.categoryId.includes(category.id)) {
      updatedDish.categoryId.push(category.id);
    } else {
      updatedDish.categoryId = updatedDish.categoryId.filter(
        (categoryId) => categoryId !== category.id
      );
    }
    setDish(updatedDish);
  };

  const setDishImages = (image: string, index: number, toDelete?: boolean) => {
    let updatedDishList: string[] = [];

    if (toDelete) {
      updatedDishList = dish?.dishImages.filter(
        (img, imgIndex) => imgIndex !== index
      );
    } else {
      updatedDishList = [...(dish?.dishImages || [])];
      updatedDishList[index] = image;
    }
    const updatedDish: Dish = { ...dish! };
    updatedDish.dishImages = updatedDishList;
    setDish(updatedDish);
  };

  const setDishName = (name: string) => {
    const updatedDish = { ...dish! };
    updatedDish.name = name;
    setDish(updatedDish);
  };
  const setDishSubtitle = (subtitle: string) => {
    const updatedDish = { ...dish! };
    updatedDish.subtitle = subtitle;
    setDish(updatedDish);
  };

  const inputProps: InputLabelProps = {
    color: "warning",
    sx: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "right",
      direction: "rtl",
    },
  };
  const textFieldStyle: SxProps<Theme> = {
    width: "40%",
    direction: "rtl",
    marginBlock: "8px",
    textAlign: "right",
  };
  return (
    <div className="add-dish-container">
      <div className="add-dish-details">
        <div className="add-dish-details-section">
          <TextField
            dir="right"
            id="dish_name"
            label="اسم الطبق"
            value={dish.name}
            onChange={(event) => setDishName(event.target.value)}
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
          />

          <TextField
            label="وصف الطبق"
            id="dish_subtitle"
            value={dish.subtitle}
            onChange={(event) => setDishSubtitle(event.target.value)}
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
            multiline
          />
        </div>
        <div className="add-dish-details-section">
          <TextField
            label="المكونات"
            id="dish_ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            sx={textFieldStyle}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
            multiline
          />
          <TextField
            label="طريقة التحضير"
            value={steps}
            id="dish_steps"
            sx={textFieldStyle}
            onChange={(event) => setSteps(event.target.value)}
            InputLabelProps={inputProps}
            color="warning"
            variant="filled"
            fullWidth
            multiline
          />
        </div>
      </div>

      <AddCategory
        onCategoryToggle={updateCategories}
        loading={loading}
        categories={categories}
      />

      <ImagePickerContainer
        dishId={dish!.id}
        images={dish!.dishImages}
        categoryId={dish!.categoryId[0]}
        updateDishImages={setDishImages}
      />

      <Fab id="add-dish-fab" onClick={addDish}>
        <Add />
      </Fab>
      <Snackbar
        open={openSnackbar}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarColor} variant="filled">
          {snackbarEvent}
        </Alert>
      </Snackbar>
    </div>
  );
}
