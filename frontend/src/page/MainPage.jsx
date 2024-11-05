import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DefaultButton from "../components/common/DefaultButton";
import Typewriter from "../components/main/Typewriter";

function MainPage() {
  const [activeSection, setActiveSection] = useState("section1");
  const REDIRECT_URI = "https://oracle1.mypjt.xyz/api/v1/auth/callback";

  const handleGitLabLogin = () => {
    window.location.href = `https://lab.ssafy.com/oauth/authorize?client_id=423f3efe4f264ff88416dc5ad049498edfaeaf5a68dcdb835ee4ce5b0bf48f32&redirect_uri=${REDIRECT_URI}&response_type=code&scope=read_user%20api&state=random_state_string`;
  };

  const sections = [
    {
      id: "section1",
      counter: "01",
      title: "Welcome",
      body: "타임라인 스타일 네비게이션을 경험해보세요. 아래로 스크롤하거나 네비게이션 숫자를 클릭해보세요.",
      bgColor: "bg-gray-900",
    },
    {
      id: "section2",
      counter: "02",
      title: "Get Started",
      body: "GitLab으로 로그인하고 여정을 시작하세요.",
      bgColor: "bg-red-500",
    },
    {
      id: "section3",
      counter: "03",
      title: "Features",
      body: "우리가 제공하는 기능을 확인해보세요.",
      bgColor: "bg-blue-500",
    },
    {
      id: "section4",
      counter: "04",
      title: "Services",
      body: "종합적인 서비스를 탐색해보세요.",
      bgColor: "bg-orange-500",
    },
    {
      id: "section5",
      counter: "05",
      title: "About Us",
      body: "팀과 목표에 대해 더 알아보세요.",
      bgColor: "bg-purple-500",
    },
    {
      id: "section6",
      counter: "06",
      title: "Contact",
      body: "연락해 주세요.",
      bgColor: "bg-emerald-500",
    },
  ];

  const fixedPositions = [
    { top: "5%", left: "10%" },
    { top: "5%", left: "50%" },
    { top: "5%", left: "70%" },
    { top: "20%", left: "15%" },
    { top: "20%", left: "35%" },
    { top: "20%", left: "55%" },
    { top: "20%", left: "75%" },
    { top: "20%", left: "95%" },
    { top: "35%", left: "10%" },
    { top: "35%", left: "70%" },
    { top: "65%", left: "10%" },
    { top: "65%", left: "30%" },
    { top: "65%", left: "50%" },
    { top: "80%", left: "15%" },
    { top: "80%", left: "55%" },
    { top: "80%", left: "75%" },
    { top: "10%", left: "5%" },
    { top: "40%", left: "85%" },
    { top: "80%", left: "85%" },
    { top: "83%", left: "82%" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          if (top <= windowHeight / 2 && top > -windowHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const PostitNote = ({ children }) => (
    <div className="relative group">
      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/40 rounded-sm transform -rotate-2" />
      <div className="relative transform transition-transform duration-300 ease-out hover:-rotate-1 hover:translate-y-1">
        {/* Main Post-it Note */}
        <div
          className="bg-yellow-300 p-8 rounded-sm relative z-50
             before:absolute before:inset-0 before:bg-gradient-to-b 
             before:from-white/5 before:to-transparent before:rounded-sm"
        >
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "multiply",
            }}
          />

          {/* Content container */}
          <div className="relative z-70">{children}</div>
        </div>

        {/* Enhanced shadow layers */}
        <div className="absolute inset-0 bg-black/20 rounded-sm blur-sm -z-10 transform translate-y-2 translate-x-2" />
        <div className="absolute inset-0 bg-black/15 rounded-sm blur-md -z-20 transform translate-y-3 translate-x-3" />
        <div className="absolute inset-0 bg-black/10 rounded-sm blur-lg -z-30 transform translate-y-4 translate-x-4" />
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>메인페이지</title>
      </Helmet>

      <div className="min-h-screen font-serif relative">
        <nav className="fixed h-full p-8 flex flex-col justify-end z-50">
          <ul className="mb-24 ml-8">
            {sections.map((section) => (
              <li
                key={section.id}
                className={`relative mb-4 transition-all duration-300 ${
                  activeSection === section.id ? "pl-4 pointer-events-none" : ""
                }`}
              >
                <div
                  className={`absolute left-[-30px] top-[15px] w-5 h-[250px] border-l-2 border-t-2 border-white
                    ${
                      activeSection === section.id
                        ? "w-8 h-[400px] top-[35px]"
                        : ""
                    }`}
                />
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="text-white transition-all duration-150 hover:pl-4 block w-full text-left"
                >
                  <span
                    className={`transition-all duration-150
                    ${activeSection === section.id ? "text-5xl" : "text-2xl"}`}
                  >
                    {section.counter}
                  </span>
                  <h3
                    className={`text-3xl font-light w-[300px] transition-all duration-300
                    ${
                      activeSection === section.id
                        ? "h-10 opacity-100"
                        : "h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {section.title}
                  </h3>
                  <p
                    className={`text-lg font-thin w-[300px] transition-all duration-300
                    ${
                      activeSection === section.id
                        ? "h-24 opacity-100"
                        : "h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {section.body}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`h-screen text-4xl font-thin ${section.bgColor} text-white
              flex flex-col justify-center items-center gap-8 relative`}
          >
            {/* 배경 포스트잇 추가 */}
            {fixedPositions.map((position, index) => (
              <div
                key={index}
                className="absolute rounded-lg transform shadow-lg z-30"
                style={{
                  width: "115px",
                  height: "115px",
                  top: position.top,
                  left: position.left,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  opacity: 0.7,
                  backgroundColor: [
                    "#ffd54f",
                    "#ff8a65",
                    "#a5d6a7",
                    "#90caf9",
                    "#f48fb1",
                  ][index % 5],
                }}
              />
            ))}

            <PostitNote>
              {section.id === "section1" && (
                <>
                  <Typewriter />
                  <p className="text-2xl font-bold mt-8 text-gray-800">
                    Welcome to Our Platform
                  </p>
                  <p className="text-xl text-gray-700">
                    아래로 스크롤하거나 네비게이션을 사용해보세요.
                  </p>
                </>
              )}
              {section.id === "section2" && (
                <>
                  <h2 className="text-2xl text-gray-800 mb-4">
                    {section.title}
                  </h2>
                  <DefaultButton
                    onClick={handleGitLabLogin}
                    theme="bright"
                    className="bg-slate-500 hover:bg-slate-300"
                    text="GitLab으로 로그인"
                  />
                </>
              )}
              {section.id !== "section1" && section.id !== "section2" && (
                <h2 className="text-2xl text-gray-800">{section.title}</h2>
              )}
            </PostitNote>
          </section>
        ))}
      </div>
    </>
  );
}

export default MainPage;
