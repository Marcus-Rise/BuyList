import "reflect-metadata";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { faSyncAlt as syncIcon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button } from "../button";
import { format } from "date-fns";
import type { IProductListService } from "../../product-list";
import { observer } from "mobx-react";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../product-list";
import { useInject } from "../../ioc";

const LAST_SYNC_DATE_STORAGE_KEY = "last-sync-date";

const Synchronize: FC<{ service: IProductListService }> = (props) => {
  const [inProgress, setInProgress] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<Date>();

  useEffect(() => {
    const dateFromStorage = localStorage.getItem(LAST_SYNC_DATE_STORAGE_KEY);

    if (dateFromStorage) {
      setLastSyncDate(new Date(dateFromStorage));
    }
  }, []);

  const sync = useCallback(async () => {
    setInProgress(true);

    await props.service.sync();

    setInProgress(false);

    const lastSyncDateToStore = new Date();
    setLastSyncDate(lastSyncDateToStore);
    localStorage.setItem(LAST_SYNC_DATE_STORAGE_KEY, lastSyncDateToStore.toISOString());
  }, [props.service]);

  const label = useMemo(
    () =>
      inProgress ? (
        <span>Синхронизация...</span>
      ) : lastSyncDate ? (
        <span>Синхронизировано {format(lastSyncDate, "dd.MM.yyyy HH:mm")}</span>
      ) : (
        <span>Еще не синхронизировано</span>
      ),
    [lastSyncDate, inProgress],
  );

  return (
    <div>
      <Button onClick={sync} title={"Синхронизировать"}>
        <Icon icon={syncIcon} />
      </Button>
      {label}
    </div>
  );
};

const ObservableSynchronize = observer(Synchronize);
const InjectedSynchronize: FC = () => <ObservableSynchronize service={useInject(PRODUCT_LIST_SERVICE_PROVIDER)} />;

export { ObservableSynchronize, InjectedSynchronize, Synchronize };
