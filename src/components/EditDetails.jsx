import { useQuery, useMutation, useIsFetching } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./EditDetails.css";
import { getSongDetails, queryClient, sendSongDetails } from "../util/util.js";
import Bargraph from "./chart/BarGraph";

function EditDetails() {
  const isLoading = useIsFetching();
  const { data } = useQuery({
    queryKey: ["songDetails"],
    queryFn: getSongDetails,
  });

  const { mutate } = useMutation({
    mutationFn: sendSongDetails,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["songDetails"] });
    },
  });

  const fetchedData = data?.data ?? undefined;
  const defaultYesRadio = fetchedData?.charge_customers ?? undefined;

  let customValue,
    category7Value,
    category8Value,
    category9Value,
    category10Value;

  const [editable, setEditable] = useState(defaultYesRadio);
  const [customError, setCustomError] = useState(false);
  const [category7Error, setCategory7Error] = useState(false);
  const [category8Error, setCategory8Error] = useState(false);
  const [category9Error, setCategory9Error] = useState(false);
  const [category10Error, setCategory10Error] = useState(false);
  const [formValidity, setFormValidity] = useState(true);

  function radioButtonHandler(event) {
    if (event.target.value === "yes") {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }
  function customInpudHandler(event) {
    if (+event.target.value <= 99) {
      setCustomError(true);
      setFormValidity(false);
    } else {
      setCustomError(false);
      setFormValidity(true);
    }
    customValue = event.target.value;
  }
  function category7Handler(event) {
    if (+event.target.value <= 79) {
      setCategory7Error(true);
      setFormValidity(false);
    } else {
      setCategory7Error(false);
      setFormValidity(true);
    }
    category7Value = event.target.value;
  }
  function category8Handler(event) {
    if (+event.target.value <= 59) {
      setCategory8Error(true);
      setFormValidity(false);
    } else {
      setCategory8Error(false);
      setFormValidity(true);
    }
    category8Value = event.target.value;
  }
  function category9Handler(event) {
    if (+event.target.value <= 39) {
      setCategory9Error(true);
      setFormValidity(false);
    } else {
      setCategory9Error(false);
      setFormValidity(true);
    }
    category9Value = event.target.value;
  }
  function category10Handler(event) {
    if (+event.target.value <= 19) {
      setCategory10Error(true);
      setFormValidity(false);
    } else {
      setCategory10Error(false);
      setFormValidity(true);
    }
    category10Value = event.target.value;
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    let editedValues = {
      amount: {
        category_6: customValue,
        category_7: category7Value,
        category_8: category8Value,
        category_9: category9Value,
        category_10: category10Value,
      },
    };
    mutate(editedValues);
  }

  return (
    <>
      {isLoading > 0 && (
        <div className="loadingBar">
          <progress></progress>
        </div>
      )}
      <motion.main layout className="main">
        <div className="container">
          <h1 className="header">
            {fetchedData?.name ?? ""}, {fetchedData?.location ?? ""} on Dhun Jam
          </h1>
          <form className="dashForm" method="" onSubmit={formSubmitHandler}>
            <div className="input-group">
              <label htmlFor="change">
                Do you want to change your customers for requesting songs?
              </label>
              <div className="radio">
                <span className="yes">
                  <input
                    type="radio"
                    name="change"
                    id="change"
                    value="yes"
                    onClick={radioButtonHandler}
                    defaultChecked={defaultYesRadio}
                  />
                  Yes
                </span>
                <span className="no">
                  <input
                    type="radio"
                    name="change"
                    id="change"
                    value="no"
                    onClick={radioButtonHandler}
                    defaultChecked={!defaultYesRadio}
                  />
                  No
                </span>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="custom">Custom song request amount-</label>
              <div>
                <input
                  type="number"
                  id="custom"
                  name="custom"
                  className={`${editable ? "" : "greyed"} ${
                    customError ? "error" : ""
                  }`}
                  disabled={!editable}
                  onBlur={customInpudHandler}
                  defaultValue={fetchedData?.amount.category_6}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="category7">
                Regular song request amounts, from high to low-
              </label>
              <div className="regular-songs">
                <input
                  type="number"
                  id="category7"
                  name="category7"
                  className={`${editable ? "" : "greyed"} ${
                    category7Error ? "error" : ""
                  }`}
                  disabled={!editable}
                  onBlur={category7Handler}
                  defaultValue={fetchedData?.amount.category_7}
                />
                <input
                  type="number"
                  id="category8"
                  name="category8"
                  className={`${editable ? "" : "greyed"} ${
                    category8Error ? "error" : ""
                  }`}
                  disabled={!editable}
                  onBlur={category8Handler}
                  defaultValue={fetchedData?.amount.category_8}
                />
                <input
                  type="number"
                  id="category9"
                  name="category9"
                  className={`${editable ? "" : "greyed"} ${
                    category9Error ? "error" : ""
                  }`}
                  disabled={!editable}
                  onBlur={category9Handler}
                  defaultValue={fetchedData?.amount.category_9}
                />
                <input
                  type="number"
                  id="category10"
                  name="category10"
                  className={`${editable ? "" : "greyed"} ${
                    category10Error ? "error" : ""
                  }`}
                  disabled={!editable}
                  onBlur={category10Handler}
                  defaultValue={fetchedData?.amount.category_10}
                />
              </div>
            </div>
            <AnimatePresence>
              {editable && <Bargraph graphData={fetchedData?.amount} />}
            </AnimatePresence>
            <button
              id="save"
              type="submit"
              disabled={!editable || !formValidity}
            >
              {isLoading ? "Saving" : "Save"}
            </button>
          </form>
        </div>
      </motion.main>
    </>
  );
}

export default EditDetails;

export async function loader() {
  return queryClient.fetchQuery({
    queryKey: ["songDetails"],
    queryFn: getSongDetails,
  });
}
