import React, { Fragment, useEffect } from 'react'

import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";
import { connect } from 'react-redux';
import './reports.css'
import { logout } from '../../_actions/authAction';
import { getKitReqs } from '../../_actions/kitReqAction'
import { getContactUss } from '../../_actions/ContactUsAction'

const ReportLanding = ({
    loading,
    logout,
    req_length,
    contact_length,
    getContactUss,
    getKitReqs,

}) => {


    useEffect(() => {
        getKitReqs()
        getContactUss()


    }, [getKitReqs, getContactUss])

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                    <div>
                        <div>
                            <div className="container  pb-4 mb-4">
                                <div className="row mb-1  animated fadeIn">


                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/expenses/viewAllexpenses" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-info h-100">
                                                <div className="card-body bg-info">
                                                    <div className="rotate">
                                                        <i className="fa fa-shopping-cart fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Expenses</h3>
                                                    <small>View All Expenses on Projects</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/investment/viewAllinvestment" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-success h-100">
                                                <div className="card-body bg-success">
                                                    <div className="rotate">
                                                        <i className="fa fa-money fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Donation</h3>
                                                    <small>View Total Donation</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/ration/allRation" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-warning h-100">
                                                <div className="card-body bg-warning">
                                                    <div className="rotate">
                                                        <i className="fa fa-medkit fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Delivered Kit</h3>
                                                    <small>View Dilevered Kit</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/view-contactus" style={{ textDecoration: "none" }}>
                                            <div className="card text-white gray h-100">
                                                <div className="card-body gray">
                                                    <div className="rotate">
                                                        <i className="fa fa-phone-square fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">View Contacted Form  <span className="text-primary"> ({contact_length})</span> </h3>
                                                    <small>See Who Contacted You!</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/view-kitrequest" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-warning h-100">
                                                <div className="card-body bg-warning">
                                                    <div className="rotate">
                                                        <i className="fa fa-medkit fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">View Requested Kits  <span className="text-primary"> ({req_length})</span> </h3>
                                                    <small>Needy users requested kits </small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>




                                </div>


                            </div>
                        </div>

                    </div>

                )}

        </Fragment>
    );
}
ReportLanding.propTypes = {
    logout: PropTypes.func.isRequired,
    getKitReqs: PropTypes.func.isRequired,
    getContactUss: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    req_length: state.kitreq.req_length,
    contact_length: state.contactus.contact_length,

});
export default connect(mapStateToProps, { logout, getKitReqs, getContactUss })(withRouter(ReportLanding));


// <div className="col-xl-3 col-sm-6 py-2">
// <Link to="/admin/investment/projectwiseinvestment" style={{ textDecoration: "none" }}>
//     <div className="card text-white bg-success h-100">
//         <div className="card-body bg-success">
//             <div className="rotate">
//                 <i className="fa fa-money fa-4x"></i>
//             </div>
//             <h3 className="text-uppercase">Prject Wise Investment</h3>
//             <small>View Total investment on Each Projects</small>
//         </div>
//     </div>
// </Link>
// </div>