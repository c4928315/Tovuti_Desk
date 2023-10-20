import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Paper, Tab, TextField } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import { Tabs } from "@mui/material";
import "./steps.css";

const currencies = [
  {},
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const refs = [
  {},
  {
    value: "#f969b6",
    label: "#f969b6",
  },
  {
    value: "CADH43Jg#",
    label: "CADH43Jg#",
  },
  {
    value: "HGFR342zA",
    label: "HGFR342zA",
  },
  {
    value: "#643fdb",
    label: "#643fdb",
  },
];

const priorities = [
  {},
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "high",
    label: "high",
  },
];

const technitians = [
  {},
  {
    value: "David Kirui",
    label: "David Kirui",
  },
  {
    value: "Alfonso Davies",
    label: "Alfonso Davies",
  },
  {
    value: "Bildad Odipo",
    label: "Bildad Odipo",
  },
  {
    value: "Derick Aduda",
    label: "Derick Aduda",
  },
];

const teams = [
  {},
  {
    value: "Team A",
    label: "Team A",
  },
  {
    value: "Team B",
    label: "Teabm B",
  },
  {
    value: "Team C",
    label: "Team C",
  },
  {
    value: "Team D",
    label: "Team D",
  },
];

const hours = [
  {},
  {
    value: "1 Hour",
    label: "1 Hour",
  },
  {
    value: "3 Hour",
    label: "3 Hour",
  },
  {
    value: "10 Hour",
    label: "10 Hour",
  },
  {
    value: "2 Hour",
    label: "2 Hour",
  },
];

function StepWorkOrder() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);

  const [value, setValue] = useState(0);

  console.log(userData)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="simple tabs example"
            className="tabContainer"
          >
            <Tab label="One WO For All Assets" className="tabsNav"/>
            <Tab label="One WO Per Asset" className="tabsNav"/>
          </Tabs>
        </Paper>

        {value === 0 && (
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="stepFlex">
                <div className="fieldLabel">
                <lable>Due Date</lable>
                  <TextField
                  required
                  InputProps={{ disableUnderline: true }}
                  id="standard-helperText"
                  label="due"
                  className="workOrderInput"
                  placeholder="due date"
                  value={userData["due"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      due: e.target.value,
                    })
                  }
                />
                </div>
                
                <div className="fieldLabel">
                <lable>Desciption</lable>
                <TextField
                  id="outlined-textarea"
                  label="description"
                  InputProps={{ disableUnderline: true }}
                  placeholder="describe"
                  multiline
                  className="workOrderInput"
                  value={userData["description"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      description: e.target.value,
                    })
                  }
                />
                </div>
              </div>
              <div className="stepFlex">
                <div className="fieldLabel">
                <lable>assigned Tech</lable>
                  <TextField
                    id="standard-select-currency-native"
                    InputProps={{ disableUnderline: true }}
                    select
                    label="assigned"
                    defaultValue="EUR"
                    className="workOrderInput"
                    value={userData["assigned"]}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        assigned: e.target.value,
                      })
                    }
                    SelectProps={{
                      native: true,
                    }}
                    variant="standard"
                  >
                    {technitians.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>

                <div className="fieldLabel">
                <lable>Priority</lable>
                  <TextField
                    id="standard-select-currency-native"
                    InputProps={{ disableUnderline: true }}
                    select
                    label="priority"
                    defaultValue="EUR"
                    className="workOrderInput"
                    value={userData["priority"]}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        priority: e.target.value,
                      })
                    }
                    SelectProps={{
                      native: true,
                    }}
                    variant="standard"
                  >
                    {priorities.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="stepFlex">
                <div className="fieldLabel">
                <lable>Assign Team(primary)</lable>
                  <TextField
                    id="standard-select-currency-native"
                    InputProps={{ disableUnderline: true }}
                    select
                    label="assign team(primary)"
                    className="workOrderInput"
                    value={userData["assign team(primary)"]}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        "assign team(primary)": e.target.value,
                      })
                    }
                    defaultValue="EUR"
                    SelectProps={{
                      native: true,
                    }}
                    variant="standard"
                  >
                    {teams.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>

                <div className="fieldLabel">
                <lable>Refference</lable>
                  <TextField
                    id="standard-select-currency-native"
                    InputProps={{ disableUnderline: true }}
                    select
                    label="ref"
                    className="workOrderInput"
                    value={userData["ref"]}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        ref: e.target.value,
                      })
                    }
                    defaultValue="EUR"
                    SelectProps={{
                      native: true,
                    }}
                    variant="standard"
                  >
                    {refs.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
              </div>

              <div className="fieldLabel">
                <lable>Estimated Hours</lable>
                <TextField
                  id="standard-select-currency-native"
                  InputProps={{ disableUnderline: true }}
                  select
                  label="estimated hours"
                  className="workOrderInput"
                  value={userData["estimated hours"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      "estimated hours": e.target.value,
                    })
                  }
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {hours.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <div>
                <h3>add parts</h3>
              </div>

              <div>
                <h3>add task</h3>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(3)}
              >
                Next
              </Button>
            </Box>
          </div>
        )}
        {value === 1 && (
          <div>
            tab 2
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="stepFlex">
                <div className="fieldLabel">
                <lable>Work Oreder Title</lable>
                  <TextField
                  required
                  id="standard-helperText"
                  label="work order title"
                  placeholder="title"
                  value={userData["work order title"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      "work order title": e.target.value,
                    })
                  }
                />
                </div>
                

                <TextField
                  id="outlined-textarea"
                  label="description"
                  placeholder="describe"
                  multiline
                  value={userData["description"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="stepFlex">
                <TextField
                  id="standard-select-currency-native"
                  InputProps={{ disableUnderline: true }}
                  select
                  label="asset"
                  defaultValue="EUR"
                  value={userData["asset"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      asset: e.target.value,
                    })
                  }
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <TextField
                  id="standard-select-currency-native"
                  select
                  label="priority"
                  defaultValue="EUR"
                  value={userData["priority"]}
                  InputProps={{ disableUnderline: true }}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      priority: e.target.value,
                    })
                  }
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
              <div className="stepFlex">
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="assigned"
                  InputProps={{ disableUnderline: true }}
                  value={userData["assigned"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      assigned: e.target.value,
                    })
                  }
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <TextField
                  id="standard-select-currency-native"
                  select
                  label="assign team(primary)"
                  InputProps={{ disableUnderline: true }}
                  value={userData["assign team(primary)"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      "assign team(primary)": e.target.value,
                    })
                  }
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <div>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="assign additional team"
                  InputProps={{ disableUnderline: true }}
                  value={userData["assign additional team"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      "assign additional team": e.target.value,
                    })
                  }
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <div>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="estimated hours"
                  InputProps={{ disableUnderline: true }}
                  value={userData["estimated hours"]}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      "estimated hours": e.target.value,
                    })
                  }
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="estimated hours"
                  placeholder="hours"
                />
              </div>

              <div>
                <h3>add parts</h3>
              </div>

              <div>
                <h3>add task</h3>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(3)}
              >
                Next
              </Button>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepWorkOrder;
