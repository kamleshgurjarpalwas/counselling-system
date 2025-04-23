import { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

export function Tabs({ children, defaultValue, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return (
    <div className={`flex items-center gap-1 p-1 rounded-lg bg-muted ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
        activeTab === value
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext);

  return (
    <div className={`${activeTab === value ? 'block' : 'hidden'} ${className}`}>
      {children}
    </div>
  );
}