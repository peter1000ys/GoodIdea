import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useAPIStore";
import TableRow from "../../components/apispecification/TableRow";
import EnhancedModal from "../../components/apispecification/EnhancedModal";

function ApiSpecificationPage() {
  const {
    apiSpecifications,
    addRow,
    updateSpec,
    columnWidths,
    updateColumnWidth,
  } = useFormStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [formData, setFormData] = useState({});

  const handleResize = (column, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[column];

    const onMouseMove = (e) => {
      const newWidth = Math.max(startWidth + e.clientX - startX, 50); // 최소 너비 설정
      updateColumnWidth(column, newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleNewRow = () => {
    console.log("Adding new row");
    addRow();
  };

  const handleUriClick = (spec) => {
    console.log("URI clicked: ", spec);
    setSelectedSpec(spec);
    setFormData(spec);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Modal input change: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting form data: ", formData);
    updateSpec(selectedSpec.id, formData);
    setSelectedSpec(formData);
    setModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>API 명세서 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <div className="overflow-x-auto p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[
                  { key: "feature", label: "기능" },
                  { key: "domain", label: "도메인" },
                  { key: "method", label: "Method" },
                  { key: "uri", label: "URI" },
                  { key: "importance", label: "중요도" },
                  { key: "backendOwner", label: "BE" },
                  { key: "frontendOwner", label: "FE" },
                  { key: "memo", label: "메모" },
                ].map((column) => (
                  <th
                    key={column.key}
                    style={{ width: `${columnWidths[column.key]}px` }}
                    className="relative p-2 text-center font-semibold"
                  >
                    {column.label}
                    <span
                      onMouseDown={(e) => handleResize(column.key, e)}
                      className="absolute right-0 top-1 h-full cursor-col-resize px-1 text-slate-200"
                      title="너비 조정 가능"
                    >
                      &#x22EE;
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apiSpecifications.map((spec, index) => (
                <TableRow
                  key={index}
                  spec={spec}
                  onUriClick={handleUriClick}
                  columnWidths={columnWidths}
                />
              ))}
            </tbody>
          </table>
          <button
            onClick={handleNewRow}
            className="mt-4 ms-2 px-4 py-2 text-gray-500 border rounded-md hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            + 추가하기
          </button>
        </div>
      </div>
      <EnhancedModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedSpec={selectedSpec}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default ApiSpecificationPage;
