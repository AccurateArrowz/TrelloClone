import React, { useState, useRef, useEffect } from "react";
import type { GroupType } from "./Group";
import type { UUID } from "./types";

type AddNewGroupProps = {
  isAddNewGroupInputOpen: boolean;
  openAddNewGroupInput: () => void;
  onCloseNewGroupInput: () => void;
  HandleAddNewGroup: (group: GroupType) => void;
};

export default function AddNewGroup({
  isAddNewGroupInputOpen,
  HandleAddNewGroup,
  onCloseNewGroupInput,
  openAddNewGroupInput,
}: AddNewGroupProps) {
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAddNewGroupInputOpen) {
      inputRef.current?.focus();
    }
  }, [isAddNewGroupInputOpen]);

  useEffect(() => {
    if (!isAddNewGroupInputOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onCloseNewGroupInput();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isAddNewGroupInputOpen, onCloseNewGroupInput]);

  const handleAddNewGroup = () => {
    if (!newGroupTitle.trim()) return;
    const newGroup = {
      id: crypto.randomUUID() as UUID,
      title: newGroupTitle.trim(),
      tasks: [],
    };
    setNewGroupTitle("");
    HandleAddNewGroup(newGroup);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddNewGroup();
    else if (e.key === "Escape") onCloseNewGroupInput();
  };

  return (
    // Shrinks to button width when closed, fixed width only when form is open
    <div ref={containerRef} className={isAddNewGroupInputOpen ? "w-[260px] flex-shrink-0 px-4 py-2" : "flex-shrink-0 px-2 py-2"}>
      {!isAddNewGroupInputOpen && (
        <button
          onClick={openAddNewGroupInput}
          aria-label="Add a new group"
          style={{
            // fontSize: "0.72rem",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            whiteSpace: "nowrap",
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "0.9rem", lineHeight: 1 }}>＋</span>
          Add New Group
        </button>
      )}

      {isAddNewGroupInputOpen && (
        <div role="form" aria-label="New group form">
          <label htmlFor="new-group-input" className="sr-only">
            Group title
          </label>
          <input
            id="new-group-input"
            ref={inputRef}
            type="text"
            className="border-black border-2"
            value={newGroupTitle}
            onChange={(e) => setNewGroupTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter group title…"
            aria-label="New group title"
            autoComplete="off"
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          <div className="flex gap-2" role="group" aria-label="Group form actions">
            <button onClick={handleAddNewGroup} aria-label="Confirm add group">
              Add Group
            </button>
            <button onClick={onCloseNewGroupInput} aria-label="Cancel adding new group">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
