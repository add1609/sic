"use client";

import type { Item } from "@/lib/grades";
import { grades } from "@/lib/grades";
import { NextLogo } from "@/ui/NextLogo";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { HiBars3BottomLeft, HiXMark } from "react-icons/hi2";
import clsx from "clsx";
import { useState } from "react";

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center space-x-2.5"
          onClick={close}>
          <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            <NextLogo />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            sic. <span className="Work in progress">🤒</span>
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center space-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <HiXMark className="block w-6 text-gray-400" />
        ) : (
          <HiBars3BottomLeft className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx("overflow-y-auto lg:static lg:block", {
          "fixed inset-x-0 bottom-0 top-14 mt-px bg-black": isOpen,
          "hidden": !isOpen,
        })}>
        <nav className="space-y-6 px-2 py-5">
          {grades.map((grade) => {
            return (
              <div key={grade.name}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                  <div>{grade.name}</div>
                </div>

                <div className="space-y-1">
                  {grade.items.map((item) => (
                    <GlobalNavItem
                      key={item.path}
                      item={item}
                      close={close}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.path === segment;

  return (
    <Link
      onClick={close}
      href={item.path}
      className={clsx(
        "block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300",
        {
          "text-gray-400 hover:bg-gray-800": !isActive,
          "text-white": isActive,
        }
      )}>
      {item.name}
    </Link>
  );
}
