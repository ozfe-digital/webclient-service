import React, { Component } from 'react';
import SystemUser from "../../helper/user";
import AppTemplate from '../../Templates/AppTemplate/AppTemplate';

import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import logo from '../../Components/logo.png';
import {Button} from '@material-ui/core';

export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = { }; 
  }
  
  componentDidMount() {
    this.getUserDetails();
  }
  
  getUserDetails () {
    // console.log(SystemUser.get())
    if (SystemUser.get() != null) {
      this.setState({
        id: SystemUser.get().id,
        name: SystemUser.get().name,
        email: SystemUser.get().email,
        role: SystemUser.get().role
      });
    }
  };
  // PDF Test Starts
  pdfGenerate = async () => {
    const pdf = new jsPdf("portrait", "pt", "a4"); 
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");  
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("shipping_label.pdf");
  };
  // PDF Test Ends

  render() {
    const { name } = this.state;
    return (
      <AppTemplate>
        <div className="HomePage">
            <h1> Home page  </h1>
        </div>
      </AppTemplate>
    )
  }
}