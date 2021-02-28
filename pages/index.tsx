import type { FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useInject } from "../src/ioc";
import type { IProductListService } from "../src/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list";
import { observer } from "mobx-react";
import Link from "next/link";
import type { ProductListModel } from "../src/product-list/product-list.model";
import { format } from "date-fns";

const Home: React.FC<{
  service: IProductListService;
}> = ({ service }) => {
  const [listArray, setListArray] = useState<ProductListModel[]>([]);

  useEffect(() => {
    setListArray(service.listArray);
  }, [service.listArray]);

  const items = useMemo(
    () =>
      listArray.map((i) => (
        <li key={i.id}>
          <Link href={`/product-list?id=${i.id}`}>
            <a>
              {i.title} {format(i.lastEditedDate, "dd.MM.yyyy HH:mm")}
            </a>
          </Link>
        </li>
      )),
    [listArray],
  );

  return <ul>{items}</ul>;
};

const ObserverHome = observer(Home);

const InjectedHome: FC = () => <ObserverHome service={useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER)} />;

export default InjectedHome;
