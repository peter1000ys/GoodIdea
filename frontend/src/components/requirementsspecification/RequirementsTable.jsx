// import { useFormStore } from "../../store/useRequirementsStore";
// import { useState, useRef } from "react";
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
// import "tippy.js/themes/light.css";

// function RequirementsTable() {
//   const { requirements, addRow, updateRequirement } = useFormStore();
//   const [columnWidths, setColumnWidths] = useState({
//     status: 120,
//     relatedPage: 150,
//     isRequired: 120,
//     name: 200,
//     description: 250,
//     author: 120,
//   });
//   const [resizing, setResizing] = useState(null);
//   const startX = useRef(0);
//   const startWidth = useRef(0);

//   const handleChange = (id, field, value) => {
//     updateRequirement(id, { [field]: value });
//   };

//   const startResizing = (e, column) => {
//     setResizing(column);
//     startX.current = e.pageX;
//     startWidth.current = columnWidths[column];
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", stopResizing);
//   };

//   const handleMouseMove = (e) => {
//     if (resizing) {
//       const diff = e.pageX - startX.current;
//       setColumnWidths((prev) => ({
//         ...prev,
//         [resizing]: Math.max(50, startWidth.current + diff),
//       }));
//     }
//   };

//   const stopResizing = () => {
//     setResizing(null);
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("mouseup", stopResizing);
//   };

//   const TableCell = ({ children, width, isHeader, resizable }) => (
//     <td
//       className={`relative border-b border-gray-100 ${
//         isHeader ? "bg-white font-medium text-gray-600" : "bg-white"
//       }`}
//       style={{ width: `${width}px`, maxWidth: `${width}px` }}
//     >
//       <div className="p-3 overflow-hidden">{children}</div>
//       {resizable && (
//         <div
//           className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-400 group"
//           onMouseDown={(e) => startResizing(e, resizable)}
//         />
//       )}
//     </td>
//   );

//   const TextInputWithTooltip = ({ value = "", onChange }) => {
//     const [key, setKey] = useState(0); // Tippy 컴포넌트를 강제로 리렌더링하기 위한 key
//     const shouldShowTooltip = value.length > 20;
//     const displayValue = shouldShowTooltip
//       ? `${value.substring(0, 20)}...`
//       : value;

//     // 입력 변경 핸들러
//     const handleInputChange = (e) => {
//       onChange(e);
//       setKey((prev) => prev + 1); // Tippy 리렌더링을 위한 key 업데이트
//     };

//     const inputElement = (
//       <div className="relative w-full">
//         <input
//           type="text"
//           value={value}
//           onChange={handleInputChange}
//           className="w-full p-2 bg-transparent focus:outline-none"
//           style={{
//             display: "block",
//             width: "100%",
//           }}
//         />
//         {shouldShowTooltip && (
//           <div className="absolute top-0 left-0 w-full pointer-events-none">
//             <div className="p-2 truncate">{displayValue}</div>
//           </div>
//         )}
//       </div>
//     );

//     if (shouldShowTooltip) {
//       return (
//         <Tippy
//           key={key} // 강제 리렌더링을 위한 key
//           content={
//             <div className="text-black bg-white p-2 max-w-md break-words">
//               {value}
//             </div>
//           }
//           theme="light"
//           placement="top"
//           arrow={true}
//           duration={[200, 0]}
//           delay={[200, 0]}
//           maxWidth={300}
//           interactive={true}
//           appendTo={() => document.body}
//           plugins={[]}
//           hideOnClick={true}
//           trigger="mouseenter" // 호버시에만 표시
//           onShow={(instance) => {
//             // 툴팁이 표시될 때마다 새로운 인스턴스 생성
//             instance.setProps({
//               content: (
//                 <div className="text-black bg-white p-2 max-w-md break-words">
//                   {value}
//                 </div>
//               ),
//             });
//           }}
//         >
//           {inputElement}
//         </Tippy>
//       );
//     }

//     return inputElement;
//   };

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr>
//               <TableCell
//                 width={columnWidths.status}
//                 isHeader
//                 resizable="status"
//               >
//                 구현
//               </TableCell>
//               <TableCell
//                 width={columnWidths.relatedPage}
//                 isHeader
//                 resizable="relatedPage"
//               >
//                 관련 페이지
//               </TableCell>
//               <TableCell
//                 width={columnWidths.isRequired}
//                 isHeader
//                 resizable="isRequired"
//               >
//                 필수 여부
//               </TableCell>
//               <TableCell width={columnWidths.name} isHeader resizable="name">
//                 요구사항 명
//               </TableCell>
//               <TableCell
//                 width={columnWidths.description}
//                 isHeader
//                 resizable="description"
//               >
//                 상세 설명
//               </TableCell>
//               <TableCell
//                 width={columnWidths.author}
//                 isHeader
//                 resizable="author"
//               >
//                 작성자
//               </TableCell>
//             </tr>
//           </thead>
//           <tbody>
//             {requirements.map((req) => (
//               <tr key={req.id}>
//                 <TableCell width={columnWidths.status}>
//                   <select
//                     value={req.status}
//                     onChange={(e) =>
//                       handleChange(req.id, "status", e.target.value)
//                     }
//                     className="w-full p-2 bg-transparent focus:outline-none"
//                   >
//                     <option value="미진행">미진행</option>
//                     <option value="진행중">진행중</option>
//                     <option value="완료">완료</option>
//                   </select>
//                 </TableCell>
//                 <TableCell width={columnWidths.relatedPage}>
//                   <TextInputWithTooltip
//                     value={req.relatedPage}
//                     onChange={(e) =>
//                       handleChange(req.id, "relatedPage", e.target.value)
//                     }
//                   />
//                 </TableCell>
//                 <TableCell width={columnWidths.isRequired}>
//                   <select
//                     value={req.isRequired}
//                     onChange={(e) =>
//                       handleChange(req.id, "isRequired", e.target.value)
//                     }
//                     className="w-full p-2 bg-transparent focus:outline-none"
//                   >
//                     <option value="필수 기능">필수 기능</option>
//                     <option value="부가 기능">부가 기능</option>
//                   </select>
//                 </TableCell>
//                 <TableCell width={columnWidths.name}>
//                   <TextInputWithTooltip
//                     value={req.name}
//                     onChange={(e) =>
//                       handleChange(req.id, "name", e.target.value)
//                     }
//                   />
//                 </TableCell>
//                 <TableCell width={columnWidths.description}>
//                   <TextInputWithTooltip
//                     value={req.description}
//                     onChange={(e) =>
//                       handleChange(req.id, "description", e.target.value)
//                     }
//                   />
//                 </TableCell>
//                 <TableCell width={columnWidths.author}>
//                   <TextInputWithTooltip
//                     value={req.author}
//                     onChange={(e) =>
//                       handleChange(req.id, "author", e.target.value)
//                     }
//                   />
//                 </TableCell>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button
//         onClick={addRow}
//         className="mt-4 px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
//       >
//         + 새 요구사항 추가
//       </button>
//     </div>
//   );
// }

// export default RequirementsTable;

import { useFormStore } from "../../store/useRequirementsStore";
import { useState, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

function RequirementsTable() {
  const { requirements, addRow, updateRequirement } = useFormStore();
  const [localRequirements, setLocalRequirements] = useState(requirements);
  const [columnWidths, setColumnWidths] = useState({
    status: 120,
    relatedPage: 150,
    isRequired: 120,
    name: 200,
    description: 250,
    author: 120,
  });
  const [resizing, setResizing] = useState(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // requirements가 변경될 때 localRequirements에 반영
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

  const startResizing = (e, column) => {
    setResizing(column);
    startX.current = e.pageX;
    startWidth.current = columnWidths[column];
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleMouseMove = (e) => {
    if (resizing) {
      const diff = e.pageX - startX.current;
      setColumnWidths((prev) => ({
        ...prev,
        [resizing]: Math.max(50, startWidth.current + diff),
      }));
    }
  };

  const stopResizing = () => {
    setResizing(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const TableCell = ({ children, width, isHeader, resizable }) => (
    <td
      className={`relative border-b border-gray-100 ${
        isHeader ? "bg-white font-medium text-gray-600" : "bg-white"
      }`}
      style={{ width: `${width}px`, maxWidth: `${width}px` }}
    >
      <div className="p-3 overflow-hidden">{children}</div>
      {resizable && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-400 group"
          onMouseDown={(e) => startResizing(e, resizable)}
        />
      )}
    </td>
  );

  const TextInputWithTooltip = ({ value = "", onChange }) => {
    const shouldShowTooltip = value.length > 15;

    return (
      <Tippy
        content={value}
        theme="light"
        placement="top"
        arrow={true}
        duration={[200, 0]}
        delay={[200, 0]}
        maxWidth={300}
        interactive={true}
        appendTo={() => document.body}
        hideOnClick={true}
        trigger={shouldShowTooltip ? "mouseenter" : ""}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 bg-transparent focus:outline-none"
          style={{
            display: "block",
            width: "100%",
          }}
        />
      </Tippy>
    );
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <TableCell
                width={columnWidths.status}
                isHeader
                resizable="status"
              >
                구현
              </TableCell>
              <TableCell
                width={columnWidths.relatedPage}
                isHeader
                resizable="relatedPage"
              >
                관련 페이지
              </TableCell>
              <TableCell
                width={columnWidths.isRequired}
                isHeader
                resizable="isRequired"
              >
                필수 여부
              </TableCell>
              <TableCell width={columnWidths.name} isHeader resizable="name">
                요구사항 명
              </TableCell>
              <TableCell
                width={columnWidths.description}
                isHeader
                resizable="description"
              >
                상세 설명
              </TableCell>
              <TableCell
                width={columnWidths.author}
                isHeader
                resizable="author"
              >
                작성자
              </TableCell>
            </tr>
          </thead>
          <tbody>
            {localRequirements.map((req) => (
              <tr key={req.id}>
                <TableCell width={columnWidths.status}>
                  <select
                    value={req.status}
                    onChange={(e) =>
                      handleChange(req.id, "status", e.target.value)
                    }
                    className="w-full p-2 bg-transparent focus:outline-none"
                  >
                    <option value="미진행">미진행</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                  </select>
                </TableCell>
                <TableCell width={columnWidths.relatedPage}>
                  <TextInputWithTooltip
                    value={req.relatedPage}
                    onChange={(value) =>
                      handleChange(req.id, "relatedPage", value)
                    }
                  />
                </TableCell>
                <TableCell width={columnWidths.isRequired}>
                  <select
                    value={req.isRequired}
                    onChange={(e) =>
                      handleChange(req.id, "isRequired", e.target.value)
                    }
                    className="w-full p-2 bg-transparent focus:outline-none"
                  >
                    <option value="필수 기능">필수 기능</option>
                    <option value="부가 기능">부가 기능</option>
                  </select>
                </TableCell>
                <TableCell width={columnWidths.name}>
                  <TextInputWithTooltip
                    value={req.name}
                    onChange={(value) => handleChange(req.id, "name", value)}
                  />
                </TableCell>
                <TableCell width={columnWidths.description}>
                  <TextInputWithTooltip
                    value={req.description}
                    onChange={(value) =>
                      handleChange(req.id, "description", value)
                    }
                  />
                </TableCell>
                <TableCell width={columnWidths.author}>
                  <TextInputWithTooltip
                    value={req.author}
                    onChange={(value) => handleChange(req.id, "author", value)}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-4 px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
      >
        + 새 요구사항 추가
      </button>
    </div>
  );
}

export default RequirementsTable;
