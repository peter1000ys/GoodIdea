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
        text="로그아웃"
      />
    </div>
  );
}

export default Header;
