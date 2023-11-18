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
import InvoiceModal from "./InvoiceModal";

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
    openModal : false,
    isOpen: false,
}

  openModal = (event) => {
    event.preventDefault()
    this.subTotalCalculate()
    this.setState({isOpen: true})
  };
  
  closeModal = (event) => this.setState({isOpen: false});
  
  onClickButton = e =>{
      e.preventDefault()
      this.setState({openModal : true})
  }
  
  onCloseModal = ()=>{
      this.setState({openModal : false})
  }

  constructor(props) {

    super(props);
    this.state = {
      orderDetails: [],
      taxRate: '19',
      taxAmmount: '0.00',
      discountRate: '0',
      discountAmmount: '0.00'
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
subTotalCalculate() {
  var items = this.state.orderDetails;
  var subTotal = 0;
  var itemTotal = 0;

  items.map(function(items) {
    subTotal = parseFloat(subTotal + parseFloat(items.product.price).toFixed(2) * parseInt(items.quantity).toFixed(2))
    itemTotal = parseFloat(items.product.price).toFixed(2) * parseInt(items.quantity).toFixed(2)
  });

  this.setState({
    subTotal: parseFloat(subTotal).toFixed(2)
  }, () => {
    this.setState({
      taxAmmount: parseFloat(parseFloat(subTotal) * (this.state.taxRate / 100)).toFixed(2)
    }, () => {
      this.setState({
        discountAmmount: parseFloat(parseFloat(subTotal) * (this.state.discountRate / 100)).toFixed(2)
      }, () => {
        this.setState({
          total: parseFloat((subTotal - this.state.discountAmmount) + parseFloat(this.state.taxAmmount)).toFixed(2)
        });
      });
    });
  });
}
  render() {

    const { orderDetails, customer, customer_address,
            customer_email, contact_number, remarks, 
            status, orderDate, order_id,
            subTotal, total,discountAmmount, taxAmmount
  } = this.state;
    
    return (
      
      <AppTemplate >
        <div className="order-view">
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
                <Button variant="primary" onClick={this.openModal} className="d-block">Review Invoice</Button>
                <InvoiceModal showModal={this.state.isOpen} 
                    closeModal={this.closeModal} 
                    orderDetails={this.state.orderDetails} 
                    customer={this.state.customer}
                    customer_address={this.state.customer_address}
                    customer_email={this.state.customer_email}
                    contact_number={this.state.contact_number}
                    orderDate={this.state.orderDate}
                    remarks={this.state.remarks}
                    status={this.state.status}
                    order_id={this.state.order_id}
                    subTotal={this.state.subTotal}
                    taxAmmount={this.state.taxAmmount} 
                    discountAmmount={this.state.discountAmmount} 
                    total={this.state.total}                    
                    />
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
