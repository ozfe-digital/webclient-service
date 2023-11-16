import React, { Component } from "react";
import {
  Card, Button, CardActions, CardContent, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Grid, Hidden

} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppTemplate from "../../Templates/AppTemplate/AppTemplate";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UpdateIcon from '@material-ui/icons/Update';
import './OrderView.css' 

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { appConfig } from '../../configs/app.config';

import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import logo from '../../Components/logo.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const { baseUrl } = appConfig;


const columns = [
  { field: 'name', headerName: 'Product Name', width: 130 },
  { field: 'product_code', headerName: 'Code', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'quantity', headerName: 'Required Quanity', width: 130 },
];

export default class OrderView extends Component {
  state={
    openModal : false
}

onClickButton = e =>{
    e.preventDefault()
    this.setState({openModal : true})
}

onCloseModal = ()=>{
    this.setState({openModal : false})
}
  

  // PDF Test Starts
  pdfGenerate = async () => {
    const pdf = new jsPdf("portrait", "pt", "a4"); 
    const data = await html2canvas(document.querySelector("#pdf:not(#itm-ignore)"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("bill.pdf");
  };
  // PDF Test Ends

  constructor(props) {

    super(props);
    this.state = {
      orderDetails: [],
    };

  }


  componentDidMount() {
    const singleOrderId = this.props.match.params.id;

    if (singleOrderId) {
      this.findOrderById(singleOrderId);
    }
  }

  findOrderById = (singleOrderId) => {
    axios.get(`${baseUrl}/order/list/` + singleOrderId)

      .then(response => {
        if (response.data != null) {
          const {
            id,
            customer,
            order_unique_id,
            remarks,
            status,
            orderDate,
            orderDetails,
          } = response.data
          //console.log('orderDetails',orderDetails)
          this.setState({
            order_id: id,
            customer: customer.customer_name,
            customer_address: customer.address,
            customer_email: customer.email,
            contact_number: customer.contact_number,
            order_unique_id: order_unique_id,
            remarks: remarks,
            status: status,
            orderDate: orderDate,

            orderDetails: orderDetails

          });
          // this.setState({orderDetails:orderDetails})

        }


      }).catch((error) => {
        console.error("Error - " + error);
      });
  };

  updateProduct(id) {
    console.log('id', id)
  }
  render() {

    const { orderDetails, customer, customer_address, customer_email, contact_number } = this.state;
    
    return (
      
      <AppTemplate >
        <div className="order-view">
        {/* Modal Starts here */}
        <Modal
            open={this.state.openModal} 
            onClose={this.onCloseModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 800, height: 600 }}>
            <div className="order-view" id="pdf">
            <p><img src={logo} alt="logo" width={"100%"} height={100}/></p>
            <Grid container spacing={4}>
            <Grid item sm={6}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Bill To:
                </Typography>
                <Typography variant="h5" component="h2">
                  {customer}
                </Typography>
                <Typography color="textSecondary">
                  {customer_email}
                </Typography>
                <Typography color="textSecondary">
                  {contact_number}
                </Typography>
                <Typography color="textSecondary">
                  {customer_address}
                </Typography>

              </CardContent>
              </Grid>
              <Grid item sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Order Details
                </Typography>

                <Typography variant="h5" component="h2">
                  {this.state.orderDate}
                </Typography>

                <Typography color="textSecondary">
                  <Typography variant="caption" display="block" gutterBottom>
                    Order ID:
                  </Typography>
                  {this.state.order_id}
                </Typography>

                <Typography variant="body2" component="p">
                  {this.state.remarks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table" >
              <TableHead>
                <TableRow style={{  backgroundColor: '#2196f3', color: '#fafafa'  }} variant="head">
                  <TableCell>Quanity</TableCell>
                  <TableCell>Product Name</TableCell>
                  
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                {orderDetails.map((eachRow, index) => {
                 const amount = eachRow.quantity * eachRow.product.price;

                  return (

                  <TableRow key={index}>
                    <TableCell>{eachRow.quantity}</TableCell>  
                    <TableCell>{eachRow.product.name}</TableCell>
                    
                    <TableCell>{eachRow.product.price}</TableCell>
                    <TableCell>{amount}</TableCell>
                  </TableRow>
                  )
                }, []
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid></div>
              <Button onClick={this.handleClose}>Close </Button>
              <Button 
                        onClick={this.pdfGenerate} 
                        id="itm-ignore"
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<UpdateIcon />}
                        data-html2canvas-ignore="true">
                        PDF
                      </Button>
            </Box>
          </Modal>

{/* Modal ends here */}





        <p><img src={logo} alt="logo" width={"100%"} height={100} hidden/></p>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Customer Details
                </Typography>
                <Typography variant="h5" component="h2">
                  {customer}
                </Typography>
                <Typography color="textSecondary">
                  {customer_address}
                </Typography>
                <Typography color="textSecondary">
                  {customer_email}
                </Typography>
                <Typography color="textSecondary">
                  {contact_number}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="small" data-html2canvas-ignore="true" onClick={this.onClickButton}>
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Order Details
                </Typography>

                <Typography variant="h5" component="h2">
                  {this.state.orderDate}
                </Typography>

                <Typography color="textSecondary">
                  <Typography variant="caption" display="block" gutterBottom>
                    This is the order Id
                  </Typography>
                  {this.state.order_id}
                </Typography>

                <Typography variant="body2" component="p">
                  {this.state.remarks}
                </Typography>
                <br />
                {this.state.status === 1 ? <ThumbUpIcon /> : <ThumbDownIcon />}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />

        <Typography variant="h4" gutterBottom>
          Product List
          
        </Typography>

        <Grid item sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table" >
              <TableHead>
                <TableRow style={{  backgroundColor: '#2196f3', color: '#fafafa'  }} variant="head">
                  <TableCell>Product Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Required Quanity</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                {orderDetails.map((eachRow, index) => {

                  return (
                    
                    <TableRow key={index}>
                    <TableCell>{eachRow.product.name}</TableCell>
                    <TableCell>{eachRow.product.product_code}</TableCell>
                    <TableCell>{eachRow.product.price}</TableCell>
                    <TableCell>{eachRow.quantity}</TableCell>
                    <TableCell>
                    <Link to={"/edit-product-to-order/" + eachRow.id} >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<UpdateIcon />}
                        data-html2canvas-ignore="true" >
                        Update
                      </Button>
                      </Link>
                      <Button 
                        onClick={this.pdfGenerate} 
                        id="itm-ignore"
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<UpdateIcon />}
                        data-html2canvas-ignore="true">
                        Export
                      </Button>
                    </TableCell>
                    
                  </TableRow>
                  )
                }, []
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        </div>        
    </AppTemplate>
    )
  }
  
}
