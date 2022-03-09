import React, { useCallback, useState } from "react";

interface UsePaginationProps {
  initialPage: number;
  initialLimit: number;
}

export const usePagination = (props: UsePaginationProps) => {
  const { initialLimit, initialPage } = props;
  const [limit, setLimit] = useState(initialLimit);
  const [page, setPage] = useState(initialPage);

  const onLimitChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLimit(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const onPageChange = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      setPage(newPage);
    },
    []
  );

  return { limit, page, onLimitChange, onPageChange };
};
