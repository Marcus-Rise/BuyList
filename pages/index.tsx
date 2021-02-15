import type { FC } from "react";
import React, { useEffect } from "react";
import { useInject } from "../src/ioc";
import type { IProductListService } from "../src/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

const Home: React.FC<{
  service: IProductListService;
}> = ({ service }) => {
  const route = useRouter();

  useEffect(() => {
    if (service.selectedList?.id) {
      route.replace(`/product-list/${service.selectedList.id}`);
    }
  }, [service.selectedList?.id, route]);

  return <></>;
};

const ObserverHome = observer(Home);

const InjectedHome: FC = () => <ObserverHome service={useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER)} />;

export default InjectedHome;
