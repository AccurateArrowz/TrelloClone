import React, { useState } from "react";
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
  const handleAddNewGroup = () => {
    if (!newGroupTitle) return;
    const newGroup = {
      id: crypto.randomUUID() as UUID,
      title: newGroupTitle,
      tasks: []
    };
    setNewGroupTitle("");
    HandleAddNewGroup(newGroup);
  };

  return (
    <div className="w-[300px] max-h-1/3 border-pink border-1 px-4 py-2"> {/* same div wrapper in both condition */}
      {!isAddNewGroupInputOpen && (
        <button
          className="border-amber-900 border-4"
          onClick={openAddNewGroupInput}
        >
          Add New Group
        </button>
      )}
      {isAddNewGroupInputOpen && (
        <>
          <input
            type="text"
            className="border-black border-2"
            value={newGroupTitle}
            onChange={(e) => setNewGroupTitle(e.target.value)}
            />
        <div className="flex gap-2">
          <button onClick={handleAddNewGroup}>Add Group</button>
          <button onClick={onCloseNewGroupInput}>Cancel</button>
        </div>
            </>
      )}
    </div>
  );
}
