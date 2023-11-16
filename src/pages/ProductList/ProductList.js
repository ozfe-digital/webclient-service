import React, { Component,useRef } from "react";

import {
    Button, ButtonGroup, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Paper, Grid
} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Templates/navbar.css';


import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './ProductList.css'
import AppTemplate from "../../Templates/AppTemplate/AppTemplate";
import { appConfig } from '../../configs/app.config';
const { baseUrl } = appConfig;






export default class ProductList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            product: []
        };
    }

    componentDidMount() {
        this.findAllProduct();
    }

    findAllProduct() {
        axios.get(`${baseUrl}/product/list/`)
            /** .then(response => console.log(response.data));*/
            .then(response => response.data)
            .then((data) => {
                this.setState({ product: data });
            });
    }

    deleteProduct = (productId) => {
        axios.delete(`${baseUrl}/product/list/` + productId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        product: this.product.filter(product => product.id !== productId)
                    });
                }
                else {
                    this.setState({ "show": false });
                }

            });

    };
    
    render() {

        return (
            
            <AppTemplate>
                <div className="product-list">

                <Link to={"new-product"} >
                    <Button
                        variant="contained"
                        color="secondary"
                        className="new-product-add-button"
                        startIcon={<CloudUploadIcon />}

                    >
                        New Product
            </Button>
            
                </Link>
                <br />

      
                <br />
                
                <Grid >
                     <Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: '#2196f3', color: '#fafafa' }} variant="head">
                                        <TableCell>Product Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Unit Price</TableCell>
                                        <TableCell>Current Stock</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        this.state.product.length === 0 ?
                                            <TableRow align="center">
                                                <TableCell colSpan="5">No Product Available</TableCell>
                                            </TableRow> :
                                            this.state.product.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.product_code}</TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.price}</TableCell>
                                                    <TableCell>{product.unit}</TableCell>
                                                    <TableCell>
                                                        {product.status === 1 ? <ThumbUpIcon /> : <ThumbDownIcon />}
                                                    </TableCell>
                                                    <TableCell>
                                                        <ButtonGroup>
                                                            <Link to={"update-product/" + product.id} >
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline-danger"
                                                                >
                                                                    <EditIcon />
                                                                </Button>
                                                            </Link>{' '}
                                                            <Button size="sm" variant="outline-danger" onClick={this.deleteProduct.bind(this, product.id)}><DeleteForeverIcon /></Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Paper>
                    </Grid>
                    </div>
            </AppTemplate>
        )
    }
}

