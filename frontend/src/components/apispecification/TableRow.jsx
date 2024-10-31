import { useFormStore } from "../../store/useAPIStore";
import { useProjectStore } from "../../store/useProjectStore";

function TableRow({ spec, onUriClick }) {
  const { updateSpec } = useFormStore();
  const { methods, importanceLevels } = useProjectStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating spec ${spec.id}: ${name} = ${value}`);
    updateSpec(spec.id, { [name]: value });
  };

  return (
    <tr>
      <td className="border p-2">
        <input
          type="text"
          name="feature"
          value={spec.feature}
          onChange={handleChange}
          className="w-full p-1 border"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          name="domain"
          value={spec.domain}
          onChange={handleChange}
          className="w-full p-1 border"
        />
      </td>
      <td className="border p-2">
        <select
          name="method"
          value={spec.method}
          onChange={handleChange}
          className="w-full p-1 border"
        >
          {methods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </td>
      <td
        className="border p-2 text-blue-500 cursor-pointer"
        onClick={() => onUriClick(spec)}
      >
        {spec.uri}
      </td>
      <td className="border p-2">
        <select
          name="importance"
          value={spec.importance}
          onChange={handleChange}
          className="w-full p-1 border"
        >
          {importanceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </td>
      <td className="border p-2">
        <input
          type="text"
          name="backendOwner"
          value={spec.backendOwner}
          onChange={handleChange}
          className="w-full p-1 border"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          name="frontendOwner"
          value={spec.frontendOwner}
          onChange={handleChange}
          className="w-full p-1 border"
        />
      </td>
      <td className="border p-2">
        <textarea
          name="memo"
          value={spec.memo}
          onChange={handleChange}
          className="w-full p-1 border"
        />
      </td>
    </tr>
  );
}

export default TableRow;
