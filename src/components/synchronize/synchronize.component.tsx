import "reflect-metadata";
import type { FC } from "react";
import React, { useMemo } from "react";
import { faSyncAlt as syncIcon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import type { IProductListService } from "../../product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../product-list";
import { observer } from "mobx-react";
import { useInject } from "../../ioc";
import styles from "./synchronize.module.scss";
import classNames from "classnames";

interface IProps {
  className?: string;
}

const Synchronize: FC<IProps & { service: IProductListService }> = (props) => {
  const label = useMemo(
    () =>
      props.service.isSyncInProgress ? (
        <span>Синхронизация...</span>
      ) : props.service.lastSyncDay ? (
        <span>Синхронизировано {format(props.service.lastSyncDay, "dd.MM.yyyy HH:mm")}</span>
      ) : (
        <span>Еще не синхронизировано</span>
      ),
    [props.service.isSyncInProgress, props.service.lastSyncDay],
  );

  return (
    <button
      className={classNames(props.className, styles.button)}
      onClick={() => props.service.sync()}
      title={"Синхронизировать"}
    >
      <Icon icon={syncIcon} />
      {label}
    </button>
  );
};

const ObservableSynchronize = observer(Synchronize);
const InjectedSynchronize: FC<IProps> = (props) => (
  <ObservableSynchronize service={useInject(PRODUCT_LIST_SERVICE_PROVIDER)} {...props} />
);

export { ObservableSynchronize, InjectedSynchronize, Synchronize };
