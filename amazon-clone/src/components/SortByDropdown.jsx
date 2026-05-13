// AI FEATURE 2 - PRODUCT SORTING

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SORT_OPTIONS } from "../features/products/sortOptions";
import "../styles/SortByDropdown.css";

function labelForSortId(id) {
  return SORT_OPTIONS.find((o) => o.id === id)?.label ?? "Featured";
}

export default function SortByDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();

  const currentLabel = labelForSortId(value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selectOption = useCallback(
    (id) => {
      onChange(id);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className="sort-by" ref={rootRef}>
      <button
        type="button"
        className="sort-by__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sort-by__trigger-text">
          Sort by: <span className="sort-by__trigger-value">{currentLabel}</span>
        </span>
        <span className="sort-by__chevron" aria-hidden>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 3.25L5 6.75L8.5 3.25"
              stroke="#555"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul id={listId} className="sort-by__menu" role="listbox" aria-label="Sort options">
          {SORT_OPTIONS.map((opt) => {
            const selected = opt.id === value;
            return (
              <li key={opt.id} className="sort-by__item" role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`sort-by__option${selected ? " sort-by__option--selected" : ""}`}
                  onClick={() => selectOption(opt.id)}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
