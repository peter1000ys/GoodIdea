import { Helmet } from "react-helmet-async";
import Header from "../components/common/Header";
import DefaultButton from "../components/common/DefaultButton";

function MainPage() {
  // 리다이렉트 URL 설정
  const handleGitLabLogin = () => {
    window.location.href =
      "https://lab.ssafy.com/oauth/authorize?client_id=423f3efe4f264ff88416dc5ad049498edfaeaf5a68dcdb835ee4ce5b0bf48f32&redirect_uri=https://oracle1.mypjt.xyz/api/v1/auth/callback&response_type=code&scope=read_user%20api&state=random_state_string";
  };

  return (
    <>
      <Helmet>
        <title>메인페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
          {/* Header Section */}
          <header className="py-10 text-center">
            <h1 className="text-5xl font-bold text-gray-800">
              환영합니다! SSAFY PROJECT!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              기획을 쉽게 만들 수 있어요!
            </p>
          </header>

          {/* Hero Section */}
          <section className="mt-16 flex flex-col items-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Main Visual"
              className="rounded-lg shadow-lg w-80 sm:w-[400px]"
            />
            <div className="mt-8 max-w-md text-center">
              <h2 className="text-3xl font-semibold text-purple-700">
                혁신적인 솔루션을 제공하다
              </h2>
              <p className="mt-4 text-gray-500">
                이곳은 여러분의 아이디어를 더욱 빛나게 만들 메인 페이지입니다.
                다양한 기능을 확인해 보세요.
              </p>

              <DefaultButton
                onClick={handleGitLabLogin}
                theme="bright"
                className="hover:bg-blue-700 py-2 px-4 rounded m-0 text-sm"
                text="GitLab 로그인"
              />
              {/* <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out">
                시작하기
              </button> */}
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-24 px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                기능 1
              </h3>
              <p className="text-gray-600">브레인스토밍 지원</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                기능 2
              </h3>
              <p className="text-gray-600">산출물 생성</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                기능 3
              </h3>
              <p className="text-gray-600">협업 가능</p>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="mt-24 bg-indigo-900 text-white py-12 text-center">
            <p className="text-lg">즐겁게 사용해 주세요!!</p>
            <p className="mt-4">© 푸터영역 </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default MainPage;
