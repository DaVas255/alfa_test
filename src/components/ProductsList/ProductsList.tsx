import { useEffect } from "react";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProductsList.module.scss";
import { fetchProducts, deleteProduct } from '@/app/store/slices/productSlice';
import { AppDispatch, RootState } from '@/app/store/store';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>Products</h1>

      <ul className={styles.product__list}>
        {products.map((product) => (
          <li key={product.id} className={styles.product__item}>
            <div className={clsx(styles['product__item-title'])}>{product.title}</div>
            <img src={product.image} alt="Photo" className={styles['product__item-image']} />
            <div className={clsx(styles['product__item-description'])}>
              {product.description}
            </div>
            <div>Category: {product.category}</div>
            <div>Price: {product.price}</div>
            <div className={clsx(styles['product__item-btns'])}>
              <button className={clsx(styles['product__item-btn'])}>Like</button>
              <button className={clsx(styles['product__item-btn'], styles['product__item-btn_delete'])} onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
}