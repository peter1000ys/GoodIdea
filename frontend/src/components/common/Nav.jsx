import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="w-64  bg-blue-600 text-white p-4 flex flex-col justify-between rounded-tr-[20px]">
      <div>
        <h1 className="text-base font-bold mb-4">GOOD IDEA</h1>
        <nav>
          <ul className="space-y-4">
            <li className="block text-2xl">
              <Link to="projectdetail/:id">기본 정보</Link>
            </li>
            <li className="block text-2xl">
              브레인 스토밍
              <svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.3251 18.3025C15.9736 18.6107 15.497 18.7838 15.0001 18.7838C14.5032 18.7838 14.0267 18.6107 13.6751 18.3025L6.60262 12.096C6.25104 11.7872 6.05359 11.3685 6.05371 10.9319C6.05383 10.4953 6.2515 10.0766 6.60324 9.768C6.95499 9.45936 7.43199 9.28603 7.92931 9.28613C8.42664 9.28624 8.90354 9.45977 9.25512 9.76855L15.0001 14.8119L20.7451 9.76855C21.0986 9.46857 21.5721 9.30246 22.0638 9.30601C22.5554 9.30955 23.0257 9.48247 23.3736 9.7875C23.7214 10.0925 23.9188 10.5053 23.9233 10.9369C23.9278 11.3684 23.739 11.7843 23.3976 12.0949L16.3264 18.3036L16.3251 18.3025Z"
                  fill="white"
                />
              </svg>
              <li className="text-xl">
                <Link to="/projectdetail/:id/brainstorming">마인드 맵</Link>
              </li>
              <li className="text-xl">
                <Link to="/projectdetail/:id/ideaboard">아이디어 보드</Link>
              </li>
            </li>
            <li className="block text-2xl">
              산출물
              <svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.3251 18.3025C15.9736 18.6107 15.497 18.7838 15.0001 18.7838C14.5032 18.7838 14.0267 18.6107 13.6751 18.3025L6.60262 12.096C6.25104 11.7872 6.05359 11.3685 6.05371 10.9319C6.05383 10.4953 6.2515 10.0766 6.60324 9.768C6.95499 9.45936 7.43199 9.28603 7.92931 9.28613C8.42664 9.28624 8.90354 9.45977 9.25512 9.76855L15.0001 14.8119L20.7451 9.76855C21.0986 9.46857 21.5721 9.30246 22.0638 9.30601C22.5554 9.30955 23.0257 9.48247 23.3736 9.7875C23.7214 10.0925 23.9188 10.5053 23.9233 10.9369C23.9278 11.3684 23.739 11.7843 23.3976 12.0949L16.3264 18.3036L16.3251 18.3025Z"
                  fill="white"
                />
              </svg>
              <li className="text-xl">
                <Link to="/projectdetail/:id/proposal">프로젝트 개요</Link>
              </li>
              <li className="text-xl">
                <Link to="/projectdetail/:id/requirementsspecification">
                  요구사항 명세서
                </Link>
              </li>
              <li className="text-xl">
                <Link to="/projectdetail/:id/apispecification">API 명세서</Link>
              </li>
              <li className="text-xl">
                <Link to="/projectdetail/:id/erd">ERD</Link>
              </li>
              <li className="text-xl">
                <Link to="/projectdetail/:id/flowchart">FLOWCHART</Link>
              </li>
            </li>
          </ul>
        </nav>
      </div>
      <footer className="text-sm">© 2024 My Website</footer>
    </div>
  );
}

export default Nav;
