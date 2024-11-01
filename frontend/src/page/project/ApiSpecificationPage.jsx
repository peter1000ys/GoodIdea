import Header from "../../components/common/Header";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useAPIStore";
import TableRow from "../../components/apispecification/TableRow";
import EnhancedModal from "../../components/apispecification/EnhancedModal";

function ApiSpecificationPage() {
  const { apiSpecifications, addRow, updateSpec } = useFormStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log("ApiSpecificationPage mounted");
    // Load initial data from backend if required
  }, []);

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
        <Header content="관통 프로젝트" />
        <div className="overflow-x-auto p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">기능</th>
                <th className="border p-2">도메인</th>
                <th className="border p-2">Method</th>
                <th className="border p-2">URI</th>
                <th className="border p-2">중요도</th>
                <th className="border p-2">백엔드 담당</th>
                <th className="border p-2">프론트 담당</th>
                <th className="border p-2">메모</th>
              </tr>
            </thead>
            <tbody>
              {apiSpecifications.map((spec, index) => (
                <TableRow key={index} spec={spec} onUriClick={handleUriClick} />
              ))}
            </tbody>
          </table>
          <button
            onClick={handleNewRow}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            새 페이지 추가
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
