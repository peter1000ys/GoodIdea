import { useFormStore } from "../../store/useRequirementsStore";

function RequirementsTable() {
  const { requirements, addRow, updateRequirement } = useFormStore();

  const handleChange = (id, field, value) => {
    updateRequirement(id, { [field]: value });
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">구현</th>
            <th className="border p-2">관련 페이지</th>
            <th className="border p-2">필수 여부</th>
            <th className="border p-2">요구사항 명</th>
            <th className="border p-2">상세 설명</th>
            <th className="border p-2">작성자</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => (
            <tr key={req.id}>
              <td className="border p-2">
                <select
                  value={req.status}
                  onChange={(e) =>
                    handleChange(req.id, "status", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                >
                  <option value="미진행">미진행</option>
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={req.relatedPage}
                  onChange={(e) =>
                    handleChange(req.id, "relatedPage", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={req.isRequired}
                  onChange={(e) =>
                    handleChange(req.id, "isRequired", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                >
                  <option value="필수 기능">필수 기능</option>
                  <option value="부가 기능">부가 기능</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={req.name}
                  onChange={(e) => handleChange(req.id, "name", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={req.description}
                  onChange={(e) =>
                    handleChange(req.id, "description", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={req.author}
                  onChange={(e) =>
                    handleChange(req.id, "author", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        새 요구사항 추가
      </button>
    </div>
  );
}

export default RequirementsTable;
