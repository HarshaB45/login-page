import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenseContext } from "./ExpenseContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Transaction {
  id: number;
  date: Date;
  title: string;
  category: string;
  amount: number;
  status: string;
}

interface SelectedOptions {
  0: Date | null;
  1: string;
  2: string;
  3: string;
}

const questions: Question[] = [
  { id: 0, text: "Q0. What is the date and time?", options: [] },
  {
    id: 1,
    text: "Q1. What is the title of the expense?",
    options: [],
  },
  {
    id: 2,
    text: "Q2. What is the amount of the expense?",
    options: [],
  },
  {
    id: 3,
    text: "Q3. What is the category of the expense?",
    options: ["Shopping", "Transportation", "Food", "Healthcare", "Other"],
  },
];

const TransactionTableAdder = ({
  handleClose,
  transactionToEdit,
}: {
  handleClose: () => void;
  transactionToEdit: Transaction | null;
}) => {
  const { addSubmittedOption, replaceTransaction } = useExpenseContext();
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    0: null,
    1: "",
    2: "",
    3: "",
  });

  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    if (transactionToEdit) {
      setSelectedOptions({
        0: transactionToEdit.date,
        1: transactionToEdit.title,
        2: transactionToEdit.amount.toString(),
        3: transactionToEdit.category,
      });
    } else {
      setSelectedOptions({
        0: null,
        1: "",
        2: "",
        3: "",
      });
    }
  }, [transactionToEdit]);

  const handleSubmit = () => {
    if (
      !selectedOptions[0] ||
      !selectedOptions[1] ||
      !selectedOptions[2] ||
      !selectedOptions[3]
    ) {
      setFormError("Please fill out all options.");
      return;
    }

    const amount = selectedOptions[2];

    const newTransaction = {
      id: transactionToEdit ? transactionToEdit.id : Date.now(),
      date: selectedOptions[0],
      title: selectedOptions[1],
      category: selectedOptions[3],
      amount: parseFloat(amount),
      status: "Pending",
    };

    if (transactionToEdit) {
      replaceTransaction(newTransaction);
    } else {
      addSubmittedOption(newTransaction);
    }

    handleClose();
    navigate("/dashboard");
  };

  const handleDateTimeChange = (date: Date | null) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      0: date,
    }));
    setFormError("");
  };

  const handleOptionChange = (
    questionId: number,
    option: string | number | Date
  ) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: option,
    }));
    setFormError("");
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setSelectedOptions((prevState) => ({
        ...prevState,
        2: value,
      }));
      setFormError("");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length <= 25) {
      setSelectedOptions((prevState) => ({
        ...prevState,
        1: value,
      }));
      setFormError("");
    }
  };

  return (
    <div className="page-container">
      <div className="heading">
        <h1>Form to add content to table</h1>
        <IconButton onClick={handleClose} className="back-button">
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="questions-container">
        {questions.map((question) => (
          <div key={question.id} className={`question${question.id}`}>
            <h2>{question.text}</h2>
            {question.id === 0 ? (
              <div className="dt-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    name="dateTime"
                    value={selectedOptions[0] || null}
                    onChange={handleDateTimeChange}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
              </div>
            ) : question.id === 1 ? (
              <div>
                <input
                  type="text"
                  id={`q${question.id}-input`}
                  value={selectedOptions[1]}
                  onChange={handleTitleChange}
                  placeholder="Enter title"
                  className="text-box-input"
                />
                <p className="char-limit-info">
                  {selectedOptions[1].length || 0}/25 characters
                </p>
              </div>
            ) : question.id === 2 ? (
              <div>
                <input
                  type="text"
                  id={`q${question.id}-input`}
                  value={selectedOptions[2]}
                  onChange={handleAmountChange}
                  placeholder="Enter amount (Numbers only)"
                  className="text-box-input"
                />
              </div>
            ) : question.id === 3 ? (
              <div>
                <Select
                  className="select-button"
                  value={selectedOptions[3]}
                  onChange={(event) =>
                    handleOptionChange(question.id, event.target.value)
                  }
                  style={{ width: "50%" }}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Select category</em>
                  </MenuItem>
                  {question.options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : null}
          </div>
        ))}
        {formError && <p className="error-message">{formError}</p>}
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default TransactionTableAdder;
