import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

interface NavbarProps {
  user: { name: string } | null;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, logout }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const startItem = (
    <span className="text-2xl font-bold text-sky-500 whitespace-nowrap">
      {`<RafafeDev />`}
    </span>
  );

  const endItem = (
    <div className="sm:flex hidden items-center gap-4">
      <span className="text-gray-600 text-sm sm:text-base">
        Logged in as: <strong>{user?.name || 'Guest'}</strong>
      </span>
      <Button
        label="Logout"
        severity="danger"
        icon="pi pi-sign-out"
        iconPos="right"
        onClick={logout}
        className="p-button-sm sm:p-button"
      />
    </div>
  );

  const hamburgerMenu = (
    <Button
      icon="pi pi-bars"
      className="sm:hidden"
      onClick={() => setSidebarVisible(true)}
    />
  );

  const sidebarContent = (
    <div className="flex flex-col gap-4">
      <span className="text-gray-600 text-sm">
        Logged in as: <strong>{user?.name || 'Guest'}</strong>
      </span>
      <Button
        label="Logout"
        severity="danger"
        icon="pi pi-sign-out"
        iconPos="right"
        onClick={logout}
        className="p-button-sm"
      />
    </div>
  );

  return (
    <div className="w-full bg-gray-50 shadow-md dark:bg-neutral-800">
      {/* Sidebar para móvil */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        className="p-sidebar-sm"
      >
        {sidebarContent}
      </Sidebar>

      {/* Menubar */}
      <Menubar
        model={[]}
        start={startItem}
        end={
          <>
            {endItem}
            {hamburgerMenu}
          </>
        }
        className="p-3 rounded-none sm:px-6"
      />
    </div>
  );
};

export default Navbar;
