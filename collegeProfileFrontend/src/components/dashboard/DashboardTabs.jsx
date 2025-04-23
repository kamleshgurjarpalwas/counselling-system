export default function DashboardTabs({ activeTab, setActiveTab }) {
    const tabs = ["dashboard", "branches", "students", "settings"];
  
    return (
      <div className="flex border-b mb-6 md:mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }