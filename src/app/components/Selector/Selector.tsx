'use client';

import React from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface SelectorItem {
  id: number | string; // Supports numeric or string IDs
  name: string; // The display name
}

interface SelectorProps<T extends SelectorItem> {
  items: T[]; // List of items to select from
  selectedItem: T; // Currently selected item
  setSelectedItem: (item: T) => void; // Callback to update the selection
  label: string; // Label for the selector
}

const Selector = <T extends SelectorItem>({
  items,
  selectedItem,
  setSelectedItem,
  label,
}: SelectorProps<T>) => {
  return (
    <div className="w-full">
      <label htmlFor="password" className="block text-base/10 font-medium text-white text-left">
              {label}
      </label>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className="relative">
          <ListboxButton  className="py-2 relative w-full cursor-default rounded-md bg-gray-200 py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="flex items-center">
              <span className="font-medium ml-3 block truncate">{selectedItem.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions className="font-medium absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {items.map((item) => (
              <ListboxOption
                key={item.id}
                value={item}
                className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-900"
              >
                <span className="block truncate">{item.name}</span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Selector;
