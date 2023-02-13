import { useEffect } from "react";
import { useItems } from "core/hooks";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Pagination from "./Pagination";

export default function ItemsContainer() {
  const getProducts = useItems();
  const products = getProducts.data?.products ?? [];

  useEffect(() => {
    console.log(products);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [products]);

  if (getProducts.isLoading) {
    return (
      <div className="flex w-75">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  return (
    <div className="w-75">
      <div className="flex flex-wrap product-grid pt2">
        {products.map((product) => {
          return (
            <div key={product.name} className="w-100 w-50-l ph3">
              <Link className="link black hover-light-purple" to={{}}>
                <div className="flex flex-column h-100">
                  <img
                    style={{ objectFit: "cover", height: "420px" }}
                    alt=""
                    loading="lazy"
                    className="img flex-auto bg-gray"
                    src={product.src}
                  />

                  <div className="pt3 pb5 flex flex-column">
                    <b className="mb1">{product.name}</b>
                    <i className="mb3 gray">{product.color.join(", ")}</i>
                    <p className="ma0 b black">${product.price / 100}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {getProducts.data && (
        <Pagination
          currentPage={getProducts.data!.page}
          next={getProducts.data?.next}
          previous={getProducts.data?.previous}
          totalPages={getProducts.data!.totalPages}
        />
      )}
    </div>
  );
}
