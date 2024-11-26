/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

import { ArrowLeft, ArrowRight } from "iconsax-react";

import { Fragment } from "react";
import { Button } from "./ui/button";
import { usePagination } from "@/hooks/usePagination";

interface TProps {
  totalPage?: number;
  page?: number;
  onAction?: (page: number) => void;
  url?: string;
}

function PaginationComp({ totalPage = 1, onAction, page }: TProps) {
  const pagination = usePagination({ total: totalPage, initialPage: 1, page });

  return (
    <div className="flex items-center justify-between px-3.5">
      <Button
        variant="ghost"
        size="sm"
        disabled={pagination.active === 1}
        onClick={() => {
          // @ts-ignore
          onAction(pagination.active - 1);
        }}
        className="gap-2"
      >
        <ArrowLeft />
      </Button>

      <Pagination>
        <PaginationContent>
          <Fragment>
            {pagination?.range &&
              // @ts-ignore
              pagination?.range.map((_range, i) => {
                if (_range === "dots") {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  return (
                    <PaginationItem
                      onClick={() => {
                        // @ts-ignore
                        onAction(_range);
                      }}
                      key={i}
                    >
                      <span
                        className={`${
                          pagination.active === _range ? "text-black" : ""
                        } cursor-pointer !mx-1`}
                      >
                        {_range}
                      </span>
                    </PaginationItem>
                  );
                }
              })}
          </Fragment>
        </PaginationContent>
      </Pagination>

      <Button
        variant="ghost"
        size="sm"
        disabled={pagination.active === totalPage}
        onClick={() => {
          // @ts-ignore
          onAction(pagination.active + 1);
        }}
        className="gap-2"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default PaginationComp;
