import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

import CreateAccountPage from "./components/CreateAccount";
import SignInPage from "./components/SignInPage";
import NotFoundPage from "./components/NotFoundPage";
import Dashboard from "./components/Dashboard";
import Adder from "./components/TransactionTableAdder";
import { ExpenseProvider } from "./components/ExpenseContext";
import TransactionTableAdder from "./components/TransactionTableAdder";

const App = () => {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/createaccount" replace />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/adder"
            element={
              <TransactionTableAdder
                handleClose={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
};

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
