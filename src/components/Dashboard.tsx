import React, { useState } from "react";
import { FaBell, FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useExpenseContext } from "./ExpenseContext";
import { IconButton, Modal, Box, Card } from "@mui/material";
import CategoryBarChart from "./CategoryBarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import RequestIcon from "@mui/icons-material/AddCircle";
import TransactionTableAdder from "./TransactionTableAdder";

const Dashboard = () => {
  const { transactions, removeTransaction, editTransaction } =
    useExpenseContext();
  const navigate = useNavigate();
  const Message = "Dashboard";
  const thewordTransaction = "Transaction";
  const thewordOverview = "Overview";

  const Total_Amount = "Total Amount";
  const totalAmount = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const now = new Date();
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setHours(0, 0, 0, 0);
  const dayOfWeek = startOfThisWeek.getDay();
  const diff =
    startOfThisWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startOfThisWeek.setDate(diff);
  startOfThisWeek.setHours(-12);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startOfThisWeek && transactionDate <= now;
  });

  const filteredAmount = filteredTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(filteredAmount);

  const Rupees = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(totalAmount);

  const Enum = Rupees;
  const Fnum = money;

  const [openAdder, setOpenAdder] = useState(false);
  const [transactionToEdit, setTransactiontoEdit] = useState(null);

  const handleAdderOpen = () => {
    setTransactiontoEdit(null);
    setOpenAdder(true);
  };

  const handleAdderClose = () => {
    setOpenAdder(false);
  };

  const enableNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Notifications Enabled", {
          body: "You have enabled notifications for this website.",
        });
      }
    });
  };

  const formatDate = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTimeString).toLocaleDateString("en-GB", options);
  };

  const handleDelete = (id: number) => {
    removeTransaction(id);
  };

  const handleEdit = (id: number) => {
    setTransactiontoEdit(editTransaction(id));
    setOpenAdder(true);
  };

  return (
    <div className="fullPage3">
      <div className="dashboard-container">
        <div className="left">
          <h2>Squarism</h2>
          <h3>MAIN MENU</h3>
          <div className="left-buttons">
            <button className="left-button-active">
              <DashboardIcon />
              Dashboard
            </button>
            <button className="left-button">
              <MailIcon />
              Messages
            </button>
            <button className="left-button">
              <DescriptionIcon />
              Documents
            </button>
            <button className="left-button">
              <PeopleIcon />
              Roles
            </button>
            <button className="left-button">
              <RequestIcon />
              Request
            </button>
          </div>
          <h3 className="teams">TEAMS</h3>
          <div className="teams-data">
            <h4 className="teams-item">HR</h4>
            <h4 className="teams-item">Design</h4>
            <h4 className="teams-item">Marketing</h4>
            <h4 className="teams-item">Development</h4>
          </div>
          <div className="settings-button-container">
            <Link to="/createAccount">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Link>
            <span className="disabled-text">Settings</span>
          </div>
          <div className="logout-button-container">
            <Link to="/createAccount">
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </Link>
            <span className="disabled-text">Logout</span>
          </div>
        </div>
        <div className="right">
          <div className="top-portion">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Type here to search" />
            </div>
            <div className="notification"></div>
            <button
              className="notification-button"
              onClick={enableNotifications}
              aria-label="Enable Notifications"
            >
              <FaBell />
            </button>
            <div className="profile-info">
              <Link to="/createAccount" className="profile-link">
                <h2>Fname Lname</h2>
                <p>Description</p>
              </Link>
            </div>
          </div>
          <div className="Message">
            <h1>{Message}</h1>
            <div className="add-button-container">
              <button onClick={handleAdderOpen} className="add-button">
                Add
              </button>
            </div>
          </div>

          <div className="dashboard-info">
            <div className="EFandT">
              <div className="EandF">
                <Card
                  sx={{
                    width: "50%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                >
                  <div className="Employees">
                    <h2 className="tab-space">
                      Total Amount
                      <span>51%</span>
                    </h2>
                    <p>{Enum}</p>
                  </div>
                </Card>
                <Card
                  sx={{
                    width: "50%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                >
                  <div className="Freelancers">
                    <h2 className="tab-space">
                      Total Amount this week
                      <span>16%</span>
                    </h2>
                    <p>{Fnum}</p>
                  </div>
                </Card>
              </div>
              <Card
                sx={{
                  width: "100%",
                  height: "80%",
                  borderRadius: "10px",
                }}
              >
                <div className="Transactions">
                  <h1>{thewordTransaction}</h1>

                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{formatDate(transaction.date)}</td>
                          <td>{transaction.title}</td>
                          <td>{transaction.category}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.status}</td>
                          <td className="delete-button-cell">
                            <FaTrash
                              onClick={() => handleDelete(transaction.id)}
                            />
                          </td>
                          <td className="edit-button-cell">
                            <FaEdit
                              onClick={() => handleEdit(transaction.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <Card
              sx={{
                width: "30%",
                height: "96.5%",
                borderRadius: "10px",
              }}
            >
              <div className="overview">
                <h1>{thewordOverview}</h1>
                <h3>{Total_Amount}</h3>
                <h2>{Rupees}</h2>
                <CategoryBarChart />
                <h1>Labels</h1>
                <div className="labels">S - Shopping</div>
                <div className="labels">T - Transportation</div>
                <div className="labels">F - Food</div>
                <div className="labels">H - Healthcare</div>
                <div className="labels">O - Other</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Modal open={openAdder} onClose={handleAdderClose}>
        <Box
          className="modal-box"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            border: "2px solid black",
            background: "white",
            color: "black",
            p: 4,
          }}
        >
          <TransactionTableAdder
            handleClose={handleAdderClose}
            transactionToEdit={transactionToEdit}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
