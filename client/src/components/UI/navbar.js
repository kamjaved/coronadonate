import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../_actions/authAction';
import logo from '../images/logo1.png'
import './Dashboard.css';


const Navbar = ({ auth: { isAuthenticated, loading, role }, logout }, props) => {

    const authLinksAdmin = (
        <Fragment>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-lg  navigation">

                                <Link className="navbar-brand" to="/dashboard">
                                    <img
                                        src={logo}
                                        alt="globus labs logo"
                                        width="220px"

                                    />
                                </Link>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <i className="fa fa-bars lg" aria-hidden="true"></i>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                                    <ul className="navbar-nav ml-auto main-nav ">

                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/dashboard">
                                                Home
                                                </Link>

                                        </li>



                                        <li className="nav-item dropdown dropdown-slide">

                                            <Link className="nav-link dropdown-toggle" to="" data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                Transaction <span><i className="fa fa-angle-down"></i></span>  </Link>

                                            <div className="dropdown-menu dropdown-menu-right">
                                                <Link className="dropdown-item" to="/admin/addinvestment">Add Donation</Link>
                                                <Link className="dropdown-item" to="/admin/viewinvestment">View Donation</Link>
                                                <Link className="dropdown-item" to="/admin/addexpenses">Add Expenses</Link>
                                                <Link className="dropdown-item" to="/admin/view-expense">View Expenses</Link>

                                            </div>



                                        </li>

                                        <li className="nav-item dropdown dropdown-slide">

                                            <Link className="nav-link dropdown-toggle" to="" data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                Kit <span><i className="fa fa-angle-down"></i></span>  </Link>

                                            <div className="dropdown-menu dropdown-menu-right">
                                                <Link className="dropdown-item" to="/admin/add-ration">Add Delivered Kit</Link>
                                                <Link className="dropdown-item" to="/admin/view-ration">View Delivered Kit</Link>


                                            </div>



                                        </li>
                                        <li className="nav-item dropdown dropdown-slide">

                                            <Link className="nav-link dropdown-toggle" to="" data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                Payment Mode <span><i className="fa fa-angle-down"></i></span>  </Link>

                                            <div className="dropdown-menu dropdown-menu-right">
                                                <Link className="dropdown-item" to="/admin/accountpayment">Add Account</Link>
                                                <Link className="dropdown-item" to="/admin/view-accpay">View Account</Link>
                                                <Link className="dropdown-item" to="/admin/upipayment">Add UPI</Link>
                                                <Link className="dropdown-item" to="/admin/view-upipay">View UPI</Link>
                                                <Link className="dropdown-item" to="/admin/view-whatgroup">View Whatsapp</Link>


                                            </div>



                                        </li>




                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/myreport">
                                                Reports
                                         </Link>
                                        </li>



                                    </ul>



                                    <ul className="navbar-nav ml-4">
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={logout} to="/login">
                                                <i className="fa fa-unlock" aria-hidden="true"></i> Logout
          </Link>
                                        </li>
                                    </ul>
                                </div>

                            </nav>
                        </div></div></div></section>
            <main className="page-content">
                <div className="mt-4 mr-8"> {props.children}</div>
            </main>
        </Fragment>
    )


    const guestLinks = (
        <Fragment>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-lg  navigation">

                                <Link className="navbar-brand" to="/">
                                    <img
                                        src={logo}
                                        alt="globus labs logo"
                                        width="220px"

                                    />
                                </Link>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <i className="fa fa-bars lg" aria-hidden="true"></i>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                                    <ul className="navbar-nav ml-auto main-nav ">

                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/dashboardguest">
                                                Home
                                            </Link>

                                        </li>



                                        <li className="nav-item dropdown dropdown-slide">

                                            <Link className="nav-link dropdown-toggle" to="" data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                Transaction <span><i className="fa fa-angle-down"></i></span>  </Link>

                                            <div className="dropdown-menu dropdown-menu-right">
                                                <Link className="dropdown-item" to="/admin/investment/viewAllinvestment">View Donation</Link>
                                                <Link className="dropdown-item" to="/admin/expenses/viewAllexpenses">View Expenses</Link>
                                            </div>



                                        </li>

                                    </ul>



                                    <ul className="navbar-nav ml-4">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">
                                                <i className="fa fa-lock" aria-hidden="true"></i> Login
      </Link>
                                        </li>
                                    </ul>
                                </div>

                            </nav>
                        </div></div></div></section>
            <main className="page-content">
                <div className="mt-4 mr-8"> {props.children}</div>
            </main>
        </Fragment>

    );







    return (
        <Fragment>
            {!loading && (
                <div>
                    {isAuthenticated ? authLinksAdmin : guestLinks}
                </div>
            )}

        </Fragment>



    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,

});
export default connect(mapStateToProps, { logout })(Navbar)


// {isAuthenticated && degreetype === "B.Com" || "B.LIB - B.LIB.SC" || "B.A." || "B.A.(Hons.)" || "B.AMS" || "B.Arch" || "BCA/BCM" || "10th" || "12th" || "B.Des" || "B.Ed" || "B.FSC" || "B.M.C - B.M.M" || "B.P.ED" || "B.Pharm" || "BBA/BBM/BBS(hons)" || "BCOM(hons)" || "" ? authLinksA : isAuthenticated && degreetype === "B.E./ B.Tech" || "B.sc" || "B.Arch" || "B.Sc(hons)" || "MBA/PGDM" || "BCA/BCM" || "MCA" || "PG Diploma" || "M.Tech" ? authLinksB : guestLinks}