import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./ProductDetails.module.scss";
import { RootState } from "@/app/store/store";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === Number(id))
  );

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className={styles.details}>
      <h1 className={styles.details__title}>{product.title}</h1>
      <img src={product.image} alt={product.title} className={styles.details__image} />
      <p className={styles.details__description}>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <button className={styles.details__back} onClick={() => navigate("/")}>
        Вернуться на главную
      </button>
    </div>
  );
};
