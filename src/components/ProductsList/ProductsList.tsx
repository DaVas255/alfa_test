import { useEffect, useState } from "react";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./ProductsList.module.scss";
import { fetchProducts, deleteProduct } from '@/app/store/slices/productSlice';
import { AppDispatch, RootState } from '@/app/store/store';
import Like from '@/app/assets/icons/like.svg?react';
import LikeEmpty from '@/app/assets/icons/like-empty.svg?react';
import Star from '@/app/assets/icons/star.svg?react';
import StarEmpty from '@/app/assets/icons/star-empty.svg?react';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
    setLikes((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
    setFavorites((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const toggleLike = (productId: number) => {
    setLikes((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const filteredProducts = filter === 'favorites'
    ? products.filter((product) => favorites[product.id])
    : products;

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>Products</h1>

      <div className={styles.product__filters}>
        <button
          className={clsx(styles.product__filter, { [styles.active]: filter === 'all' })}
          onClick={() => setFilter('all')}
        >
          Все карточки
        </button>
        <button
          className={clsx(styles.product__filter, { [styles.active]: filter === 'favorites' })}
          onClick={() => setFilter('favorites')}
        >
          Избранное
        </button>
      </div>

      <ul className={styles.product__list}>
        {filteredProducts.map((product) => (
          <li key={product.id} className={styles.product__item}>
            <Link to={`/products/${product.id}`} className={styles.product__link}>
              <div className={clsx(styles['product__item-title'])}>{product.title}</div>
              <img src={product.image} alt="Photo" className={styles['product__item-image']} />
              <div className={clsx(styles['product__item-description'])}>
                {product.description}
              </div>
              <div>Category: {product.category}</div>
              <div>Price: {product.price}</div>
            </Link>

            <div className={clsx(styles['product__item-btns'])}>
              <button
                className={clsx(styles['product__item-btn'], styles['product__item-btn_like'])}
                onClick={() => toggleLike(product.id)}
              >
                {likes[product.id] ? <Like /> : <LikeEmpty />}
              </button>
              <button
                className={clsx(styles['product__item-btn'], styles['product__item-btn_favorite'])}
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites[product.id] ? <Star /> : <StarEmpty />}
              </button>
              <button
                className={clsx(styles['product__item-btn'], styles['product__item-btn_delete'])}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
}