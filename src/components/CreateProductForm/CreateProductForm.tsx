import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { AppDispatch } from '@/app/store/store';
import { addProduct } from '@/app/store/slices/productSlice';
import { IProduct } from '@/app/types';
import styles from './CreateProductForm.module.scss';

export const CreateProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>({
    mode: "onBlur",
  });

  const onSubmit = (data: IProduct) => {
    reset();
    dispatch(addProduct(data));
  };

  return (
    <div className={styles.createProduct}>
      <NavLink to="/" className={styles.createProduct__back}>Назад</NavLink>
      <h1 className={styles.createProduct__title}>Создать продукт</h1>

      <form className={styles.createProduct__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createProduct__formGroup}>
          <label htmlFor="title">Название</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Название обязательно" })}
            className={styles.createProduct__input}
          />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>

        <div className={styles.createProduct__formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            {...register("description", { required: "Описание обязательно" })}
            className={styles.createProduct__input}
          />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>

        <div className={styles.createProduct__formGroup}>
          <label htmlFor="price">Цена</label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Цена обязательна",
              min: { value: 0, message: "Цена не может быть отрицательной" },
            })}
            className={styles.createProduct__input}
          />
          {errors.price && <span className={styles.error}>{errors.price.message}</span>}
        </div>

        <div className={styles.createProduct__formGroup}>
          <label htmlFor="category">Категория</label>
          <input
            type="text"
            id="category"
            {...register("category", { required: "Категория обязательна" })}
            className={styles.createProduct__input}
          />
          {errors.category && <span className={styles.error}>{errors.category.message}</span>}
        </div>

        <div className={styles.createProduct__formGroup}>
          <label htmlFor="image">Ссылка на изображение</label>
          <input
            type="url"
            id="image"
            {...register("image", { required: "Ссылка на изображение обязательна" })}
            className={styles.createProduct__input}
          />
          {errors.image && <span className={styles.error}>{errors.image.message}</span>}
        </div>

        <button type="submit" className={styles.createProduct__submit}>
          Создать продукт
        </button>
      </form>
    </div>
  );
};