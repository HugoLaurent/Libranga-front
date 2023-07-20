import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function Modal({
  open,
  setOpen,
  id,
  image,
  title,
  title_japanese,
  synopsis,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <article
              key={id}
              className="mb-7 rounded border border-secondary bg-white p-6 shadow lg:mb-0 lg:mr-7 lg:w-4/12"
            >
              <div className="flex items-center rounded-md border-b border-gray-200 bg-secondary px-4 py-3">
                <img src={image} className="h-12 w-12 rounded-full" />
                <div className="flex w-full items-start justify-between">
                  <div className="w-full pl-3">
                    <p className="text-xl font-medium leading-5 text-white">
                      {title}
                    </p>
                    <p className="pt-2 text-sm leading-normal text-white">
                      {title_japanese}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <p className="mb-8   py-4 text-sm leading-5 text-gray-600">
                  {synopsis}
                </p>
              </div>

              <div className="mx-auto">
                <button
                  type="button"
                  className="mr-3 inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  <Link to={`/article/${title?.toLowerCase()}`}>
                    Read all articles
                  </Link>
                </button>

                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </article>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
