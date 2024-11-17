import { FaSearch } from 'react-icons/fa'; // Import the search icon

export default function Searchbar() {
  return (
    <div className="flex justify-center my-4">
      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch className="w-5 h-5" /> {/* React icon */}
        </span>
      </div>
    </div>
  );
}
