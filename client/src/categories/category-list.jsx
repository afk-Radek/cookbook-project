import { useContext } from "react";
import { CategoryContext } from "./category-provider";
import Category from "./category";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiRefresh } from "@mdi/js";

function CategoryList() {
  const { data, state, handlerMap } = useContext(CategoryContext);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handlerMap.fetchCategories();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      <h1>
        <Stack direction="horizontal" gap={3}>
          <div>Seznam kategorií</div>
          <div className="ms-auto">
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => {
                handlerMap.fetchCategories();
              }}
            >
              <Icon path={mdiRefresh} size={1} spin={state === "loading"} />{" "}
              Aktualizovat
            </Button>
          </div>
        </Stack>
      </h1>
      <div>
        <Category />
      </div>
      {data.itemList.length > 0 ? (
        data.itemList.map((category) => (
          <Category key={category.id} data={category} />
        ))
      ) : (
        <div>Není vyplněna žádná kategorie</div>
      )}
    </div>
  );
}

export default CategoryList;
