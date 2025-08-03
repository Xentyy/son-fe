import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main>
        {children} {/* children: Bu iskeletin içine hangi sayfa gelirse onu render et */}
      </main>
    </div>
  );
};

export default Layout;