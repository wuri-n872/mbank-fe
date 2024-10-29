import React, { PropsWithChildren } from "react";

import "./Page.scss";

export default function Page({ children }: PropsWithChildren) {
  return (
    <div className="page">
      <div className="page-header">
        <img src={require('assets/images/mitrais.jpg')} alt="MitraBank" />
        <h1><strong>MitraBank</strong> Cardless ATM</h1>
      </div>

      {children}
    </div>
  );
}
