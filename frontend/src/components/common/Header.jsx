import DefaultButton from "./DefaultButton";

function Header({ content }) {
  return (
    <div className="border-b-2 border-gray-300 flex items-center justify-between p-2">
      {content}
      <DefaultButton
        onClick={() => {
          // 로그아웃 로직
        }}
        theme="bright"
        className="hover:bg-blue-700 py-2 px-4 rounded m-0 text-sm"
        text={
          <div className="flex items-center">
            {/* logout */}
            <svg
              fill="none"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
              // {...props}
            >
              <path
                stroke="currentColor"
                d="M13.5 7.5l-3 3.25m3-3.25l-3-3m3 3H4m4 6H1.5v-12H8"
              />
            </svg>
          </div>
        }
      />
    </div>
  );
}

export default Header;
