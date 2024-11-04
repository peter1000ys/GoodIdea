import { useFormStore } from "../../store/useRequirementsStore";
import { useState, useEffect } from "react";

function RequirementsTable() {
  const {
    requirements,
    addRow,
    updateRequirement,
    columnWidths,
    updateColumnWidth,
  } = useFormStore();

  const [localRequirements, setLocalRequirements] = useState(requirements);

  useEffect(() => {
    setLocalRequirements(requirements);
  }, [requirements]);

  const handleChange = (id, field, value) => {
    const updatedRequirements = localRequirements.map((req) =>
      req.id === id ? { ...req, [field]: value } : req
    );
    setLocalRequirements(updatedRequirements);
    updateRequirement(id, { [field]: value });
  };

  const handleAddRow = () => {
    addRow();
  };

  const handleResize = (column, e) => {
    const startX = e.clientX;
    const startWidth = columnWidths[column];

    const onMouseMove = (e) => {
      const newWidth = Math.max(startWidth + e.clientX - startX, 50);
      updateColumnWidth(column, newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Object.keys(columnWidths).map((column) => (
              <th
                key={column}
                className="p-1 relative"
                style={{ width: columnWidths[column] }}
              >
                {column === "status" && "구현"}
                {column === "relatedPage" && "관련 페이지"}
                {column === "isRequired" && "필수 여부"}
                {column === "name" && "요구사항 명"}
                {column === "description" && "상세 설명"}
                {column === "author" && "작성자"}
                <span
                  onMouseDown={(e) => handleResize(column, e)}
                  className="absolute right-0 top-1 h-full cursor-col-resize px-1"
                  title="너비 조정 가능"
                >
                  &#x22EE;
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localRequirements.map((req) => (
            <tr key={req.id}>
              <td className="p-2" style={{ width: columnWidths.status }}>
                <select
                  value={req.status}
                  onChange={(e) =>
                    handleChange(req.id, "status", e.target.value)
                  }
                  className="w-full p-1 rounded border"
                >
                  <option value="미진행">미진행</option>
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                </select>
              </td>
              <td className="p-2" style={{ width: columnWidths.relatedPage }}>
                <input
                  type="text"
                  value={req.relatedPage}
                  onChange={(e) =>
                    handleChange(req.id, "relatedPage", e.target.value)
                  }
                  className="w-full p-1 rounded border-b"
                />
              </td>
              <td className="p-2" style={{ width: columnWidths.isRequired }}>
                <select
                  value={req.isRequired}
                  onChange={(e) =>
                    handleChange(req.id, "isRequired", e.target.value)
                  }
                  className="w-full p-1 rounded border"
                >
                  <option value="필수 기능">필수 기능</option>
                  <option value="부가 기능">부가 기능</option>
                </select>
              </td>
              <td className="p-2" style={{ width: columnWidths.name }}>
                <input
                  type="text"
                  value={req.name}
                  onChange={(e) => handleChange(req.id, "name", e.target.value)}
                  className="w-full p-1 rounded border-b"
                />
              </td>
              <td className="p-2" style={{ width: columnWidths.description }}>
                <input
                  type="text"
                  value={req.description}
                  onChange={(e) =>
                    handleChange(req.id, "description", e.target.value)
                  }
                  className="w-full p-1 rounded border-b"
                />
              </td>
              <td className="p-2" style={{ width: columnWidths.author }}>
                <input
                  type="text"
                  value={req.author}
                  onChange={(e) =>
                    handleChange(req.id, "author", e.target.value)
                  }
                  className="w-full p-1 rounded border-b"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className="mt-4 ms-2 px-4 py-2 text-gray-500 border rounded-md hover:bg-gray-200 transition duration-200 ease-in-out"
      >
        + 추가하기
      </button>
    </div>
  );
}

export default RequirementsTable;
