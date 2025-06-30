function Sidebar() {
  return (
    <aside className="w-1/4 bg-gray-100 p-4 h-full">
      <ul className="space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">Profile</li>
        <li className="hover:text-blue-600 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
