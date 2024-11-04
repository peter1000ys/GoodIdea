import React from "react";
import MarkdownEditor from "./MarkdownEditor";

const EnhancedModal = ({
  isOpen,
  onClose,
  selectedSpec,
  formData,
  onSubmit,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute inset-6 bg-gray-100 rounded-xl shadow-2xl overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            API 명세 수정 - {selectedSpec?.uri}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URI
            </label>
            <input
              type="text"
              name="uri"
              value={formData.uri || ""}
              onChange={onChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <MarkdownEditor
            label="Request Header"
            name="requestHeader"
            value={formData.requestHeader}
            onChange={onChange}
          />

          <MarkdownEditor
            label="Request Params"
            name="requestParams"
            value={formData.requestParams}
            onChange={onChange}
          />

          <MarkdownEditor
            label="Request Body"
            name="requestBody"
            value={formData.requestBody}
            onChange={onChange}
          />

          <MarkdownEditor
            label="Response Body"
            name="responseBody"
            value={formData.responseBody}
            onChange={onChange}
          />

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedModal;
