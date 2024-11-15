export function Cursor({ color, x, y, message }) {
  return (
    <>
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateX(${x}px) translateY(${y}px)`,
          // zIndex: 2147483647,
        }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z"
          fill={color}
        />
      </svg>
      {message && (
        <div
          className="absolute top-5 left-2 rounded-3xl px-4 py-2"
          style={{ backgroundColor: color, borderRadius: 20 }}
        >
          <p className="whitespace-nowrap text-sm leading-relaxed text-white">
            {message}
          </p>
        </div>
      )}
    </>
  );
}
