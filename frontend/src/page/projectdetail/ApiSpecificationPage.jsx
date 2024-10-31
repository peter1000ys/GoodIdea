import Header from "../../components/common/Header";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useAPIStore";
import TableRow from "../../components/apispecification/TableRow";
import PortalModal from "../../components/common/PortalModal";
import ReactMarkdown from "react-markdown";

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
      <PortalModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-full p-6">
          <h2 className="text-xl mb-4">API 명세 수정 - {selectedSpec?.uri}</h2>
          <div className="mb-4">
            <label className="block mb-2">URI</label>
            <input
              type="text"
              name="uri"
              value={formData.uri || ""}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Request Header (Markdown 사용 가능)
            </label>
            <textarea
              name="requestHeader"
              value={formData.requestHeader || ""}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            <ReactMarkdown>{formData.requestHeader || ""}</ReactMarkdown>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Request Params (Markdown 사용 가능)
            </label>
            <textarea
              name="requestParams"
              value={formData.requestParams || ""}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            <ReactMarkdown>{formData.requestParams || ""}</ReactMarkdown>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Request Body (Markdown 사용 가능)
            </label>
            <textarea
              name="requestBody"
              value={formData.requestBody || ""}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            <ReactMarkdown>{formData.requestBody || ""}</ReactMarkdown>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Response Body (Markdown 사용 가능)
            </label>
            <textarea
              name="responseBody"
              value={formData.responseBody || ""}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            <ReactMarkdown>{formData.responseBody || ""}</ReactMarkdown>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setModalOpen(false)}
              className="p-2 mr-2 bg-gray-300 rounded"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="p-2 bg-blue-500 text-white rounded"
            >
              저장
            </button>
          </div>
        </div>
      </PortalModal>
    </>
  );
}

export default ApiSpecificationPage;
