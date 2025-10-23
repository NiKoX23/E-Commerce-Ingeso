import React, { useState, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';

type PrimeSidebarProps = {
  visible?: boolean;
  onHide?: () => void;
};

export default function PrimeSidebar({ visible: controlledVisible, onHide }: PrimeSidebarProps) {
  const [visible, setVisible] = useState(controlledVisible ?? false);
  const btnRef1 = useRef<any>(null);
  const btnRef2 = useRef<any>(null);
  const btnRef3 = useRef<any>(null);
  const btnRef4 = useRef<any>(null);

  // If used as controlled component from parent
  React.useEffect(() => {
    if (typeof controlledVisible === 'boolean') setVisible(controlledVisible);
  }, [controlledVisible]);

  const hide = () => {
    setVisible(false);
    onHide && onHide();
  };

  return (
    <Sidebar
      visible={visible}
      onHide={() => hide()}
      content={({ closeIconRef }: any) => (
        <div className="min-h-screen flex relative lg:static surface-ground">
          <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '280px' }}>
            <div className="flex flex-column h-full">
              <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                <span className="inline-flex align-items-center gap-2">
                  {/* logo svg omitted for brevity, keep yours if preferred */}
                  <span className="font-semibold text-2xl text-primary">LOGO PARGAS</span>
                </span>
                <span>
                  <Button type="button" ref={closeIconRef} onClick={hide} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                </span>
              </div>
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <StyleClass nodeRef={btnRef1} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                      <div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                        <span className="font-medium">FAVORITOS</span>
                        <i className="pi pi-chevron-down"></i>
                        <Ripple />
                      </div>
                    </StyleClass>
                    <ul className="list-none p-0 m-0 overflow-hidden">
                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-home mr-2"></i>
                          <span className="font-medium">Panel de control</span>
                          <Ripple />
                        </a>
                      </li>
                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-bookmark mr-2"></i>
                          <span className="font-medium">Guardados</span>
                          <Ripple />
                        </a>
                      </li>
                      <li>
                        <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                          <li>
                            <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                              <li>
                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                  <i className="pi pi-search mr-2"></i>
                                  <span className="font-medium">Search</span>
                                  <Ripple />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-chart-line mr-2"></i>
                              <span className="font-medium">Expenses</span>
                              <Ripple />
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-comments mr-2"></i>
                          <span className="font-medium">Mensajes</span>
                          <span className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                            3
                          </span>
                          <Ripple />
                        </a>
                      </li>
                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-calendar mr-2"></i>
                          <span className="font-medium">Calendario</span>
                          <Ripple />
                        </a>
                      </li>
                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-cog mr-2"></i>
                          <span className="font-medium">Ajustes</span>
                          <Ripple />
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="list-none p-3 m-0">
                  <li>

                    <ul className="list-none p-0 m-0 overflow-hidden">

                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-chart-bar mr-2"></i>
                          <span className="font-medium">Historial compras</span>
                          <Ripple />
                        </a>
                      </li>
                      <li>
                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <i className="pi pi-cog mr-2"></i>
                          <span className="font-medium">Ajustes</span>
                          <Ripple />
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                  <span className="font-bold">PARGAS LTDA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    ></Sidebar>
  );
}