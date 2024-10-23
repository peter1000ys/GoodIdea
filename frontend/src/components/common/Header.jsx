function Header() {
  return (
    <header className="w-64 h-screen bg-blue-600 text-white p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-4">사이트 이름</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="/" className="block">
                홈
              </a>
            </li>
            <li>
              <a href="/about" className="block">
                소개
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <footer className="text-sm">© 2024 My Website</footer>
    </header>
  );
}

export default Header;
