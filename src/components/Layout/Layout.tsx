import React, { Ref } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./Layout.scss";
import Page from "components/Page/Page";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import routes from "routes/routes";

export default function Layout() {
  const currentOutlet = useOutlet();
  const location = useLocation();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <div className="layout">
      <div className="layout-wrapper">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef as Ref<HTMLElement>}
            timeout={300}
            classNames="transition"
            unmountOnExit
          >
            {() => (
              <div className="transition" ref={nodeRef as Ref<HTMLDivElement>}>
                <Page>{currentOutlet}</Page>
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>

      <ToastContainer />
    </div>
  );
}
