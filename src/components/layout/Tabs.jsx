const tabItems = [
  ["users", "Users"],
  ["books", "Books"],
  ["requests", "Requests"],
  ["media", "Media"],
];

export default function Tabs({ activeTab, onChange }) {
  return (
    <nav className="tabs" role="tablist">
      {tabItems.map(([key, label]) => (
        <button
          key={key}
          className={activeTab === key ? "tab active" : "tab"}
          onClick={() => onChange(key)}
          role="tab"
          aria-selected={activeTab === key}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
