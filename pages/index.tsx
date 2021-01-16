import React, { useCallback, useEffect } from "react";
import { useInject } from "../src/ioc/use-inject.decorator";
import type { IProductListService } from "../src/product-list/product-list.service-interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";
import { useRouter } from "next/router";

const Home: React.FC<{
  service: IProductListService;
}> = ({ service }) => {
  const route = useRouter();

  const getLatestProductList = useCallback(() => {
    service.getLatest().then(({ id }) => route.replace(`/productList/${id}`));
  }, [service, route]);

  useEffect(getLatestProductList, [getLatestProductList]);

  return <></>;
};

const InjectedHome: React.FC = () => <Home service={useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER)} />;

export default InjectedHome;
