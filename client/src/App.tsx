import { useMemo,useEffect } from "react";
import SearchBar from "components/SearchBar";
import Select from "components/Select";
import { useItems } from "core/hooks";
import ItemsContainer from "components/ItemsContainer";
import { useSearchParams } from "react-router-dom";
import ColorFilters from "components/ColorFilters";
import PriceFilter from "components/PriceFilter";
import Pagination from "components/Pagination";

export default function App() {
  const [search, setSearch] = useSearchParams();
  const getItems = useItems();
  const maxPrice = (getItems.data?.maxPrice ?? 0) / 100;


  return (
    <div className="mw9 center ph4 pb4 bg-white min-vh-100 br bl b--light-gray">
      <div className="flex bb b--black-10 justify-between items-center mb4">
        <h1>New arrivals</h1>

        <div className="mr3 ml-auto">
          <SearchBar />
        </div>

        <Select
          onChange={(e) => {
            search.delete("page");
            search.set("sort", e.target.value);
            setSearch(search, {
              replace: true,
            });
          }}
          label="Sort by"
          name="sort"
          options={[
            {
              label: "Name",
              value: "name",
            },
            {
              label: "Price High",
              value: "priceDesc",
            },
            {
              label: "Price Low",
              value: "priceAsc",
            },
          ]}
        />
      </div>

      <div className="flex">
        <div className="w-25 mr4">
          <div style={{ position: "sticky", top: "20px" }}>
            <ul className="list pa0 ma0 pb3 bb b--black-10">
              <li className="f6 fw5 silver mb2">
                <div className="flex justify-between">
                  Filters
                  <span>{getItems.data?.itemCounts.totalResults ?? 0} Products</span>
                </div>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Bags
                  <span>{getItems.data?.itemCounts.bags ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Shoes
                  <span>{getItems.data?.itemCounts.shoes ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Jackets
                  <span>{getItems.data?.itemCounts.jackets ?? 0}</span>
                </button>
              </li>
            </ul>

            <ColorFilters />
            <PriceFilter maxPrice={maxPrice} />
          </div>
        </div>

        <ItemsContainer />
      </div>
      {/* {getItems.data && (
        <Pagination
          currentPage={getItems.data!.page}
          next={getItems.data?.next}
          previous={getItems.data?.previous}
          totalPages={getItems.data!.totalPages}
        />
      )} */}
    </div>
  );
}
