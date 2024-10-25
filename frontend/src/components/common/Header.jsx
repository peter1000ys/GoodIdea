function Header({ content }) {
  return (
    <div className="border-b-2 border-gray-300 flex items-center justify-between p-2">
      {content}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </div>
  );
}

export default Header;
