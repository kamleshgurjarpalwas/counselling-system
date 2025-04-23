import axios from "axios";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import SwapPopUp from "./SwapPopUp";
import FilterSection from "./Filter";
import RightSelectedChoices from "./RightSelectedChoices";
import LeftChoiceSelection from "./LeftChoiceSelection";
import { data } from "react-router-dom";

const ChoicesSelection = () => {
  const [choices, setChoices] = useState([]);
  const [allChoicesAfterFilter, setAllChoicesAfterFilter] = useState([]);
  const [selectedChoicesId, setSelectedChoicesId] = useState([]);
  const [selectedChoicesDetails, setSelectedChoicesDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataForFilterBox, setDataForFilterBox] = useState();
  const [isActivityInSelection, setIsActivityInSelection] = useState(false);
  const [isActivityInSelected, setIsActivityInSelected] = useState(false);

  const handleClearFilter = () => {
    setAllChoicesAfterFilter(choices);
  };

  const handleFilter = (filterData) => {
    const { typeFilters, selectedCollege, selectedBranch } = filterData;
    const filteredChoices = choices.filter((choices) => {
      const matchesType = typeFilters.length
        ? typeFilters.includes(choices.tag)
        : true;
      const matchesCollege = selectedCollege
        ? choices.collegeName === selectedCollege
        : true;
      const matchesBranch = selectedBranch
        ? choices.branchName === selectedBranch
        : true;
      return matchesType && matchesCollege && matchesBranch;
    });
    console.log("Filtered choices", filteredChoices);
    setAllChoicesAfterFilter(filteredChoices);
  };

  const selectChoice = (id) => {
    console.log("Id for selection id is", id);
    const tempIdState = [...selectedChoicesId];
    tempIdState.push(id);
    setSelectedChoicesId(tempIdState);
    const selectedChoice = choices.find((choice) => choice.choiceId === id);
    const tempState = [...selectedChoicesDetails];
    tempState.push(selectedChoice);
    setSelectedChoicesDetails(tempState);
    return;
  };

  const deleteChoice = (index) => {
    const idOfDeletedChoice = selectedChoicesDetails[index].choiceId;
    const tempState = [...selectedChoicesDetails];
    const afterDeletion = tempState.filter((choice, idx) => idx != index);
    setSelectedChoicesDetails(afterDeletion);
    //for ids
    let tempIdState = [...selectedChoicesId];
    tempIdState = tempIdState.filter((id) => id != idOfDeletedChoice);
    setSelectedChoicesId(tempIdState);
    return;
  };

  const swapChoices = (index1, index2) => {
    const tempState = [...selectedChoicesDetails];
    const temp = tempState[index1];
    tempState[index1] = tempState[index2];
    tempState[index2] = temp;
    setSelectedChoicesDetails(tempState);
    //for ids
    let tempIdState = [...selectedChoicesId];
    const tempT = tempIdState[index1];
    tempIdState[index1] = tempIdState[index2];
    tempIdState[index2] = tempT;
    setSelectedChoicesId(tempIdState);
    return;
  };

  const upChoice = (index) => {
    const tempState = [...selectedChoicesDetails];
    const temp = tempState[index];
    tempState[index] = tempState[index - 1];
    tempState[index - 1] = temp;
    setSelectedChoicesDetails(tempState);
    //for ids
    let tempIdState = [...selectedChoicesId];
    const tempT = tempIdState[index];
    tempIdState[index] = tempIdState[index - 1];
    tempIdState[index - 1] = tempT;
    setSelectedChoicesId(tempIdState);
    return;
  };

  const downChoice = (index) => {
    const tempState = [...selectedChoicesDetails];
    const temp = tempState[index];
    tempState[index] = tempState[index + 1];
    tempState[index + 1] = temp;
    setSelectedChoicesDetails(tempState);
    //for ids
    let tempIdState = [...selectedChoicesId];
    const tempT = tempIdState[index];
    tempIdState[index] = tempIdState[index + 1];
    tempIdState[index + 1] = tempT;
    setSelectedChoicesId(tempIdState);
    return;
  };

  useEffect(() => {
    const selectedChices = selectedChoicesId
      .map((choiceId) => choices.find((choice) => choice.choiceId === choiceId))
      .filter(Boolean);
    setSelectedChoicesDetails(selectedChices);
  }, [selectedChoicesId]);

  useEffect(() => {
    setAllChoicesAfterFilter(choices);
  }, [choices]);

  //collecting data for filter box
  useEffect(() => {
    const fetchDataForFilterBox = async () => {
      const data = {};
      const colleges = new Set();
      const branches = new Set();
      const tag = new Set();
      choices.forEach((choice) => {
        colleges.add(choice.collegeName);
        branches.add(choice.branchName);
        tag.add(choice.tag);
        // tag.add(choice.tag.toUpperCase());
      });
      data.colleges = Array.from(colleges);
      data.branches = Array.from(branches);
      data.tag = Array.from(tag);
      setDataForFilterBox(data);
    };
    fetchDataForFilterBox();
  }, [choices]);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/user/allchoices",
          {
            withCredentials: true,
          }
        );
        setChoices(response.data.data);
        // setInAllChoices(response.data.data);
      } catch (error) {
        setErrorMessage(true);
      } finally {
        setLoading(false);
      }
    };
    fetchChoices();
  }, []);

  useEffect(() => {
    const fetchSelectedChoices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/user/selectedchoice",
          {
            withCredentials: true,
          }
        );
        console.log("CALLED");
        setSelectedChoicesId(response.data.selectedChoices);
      } catch (error) {
        setErrorMessage(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedChoices();
  }, [choices]);

  //submitting the selected choices
  const submitSelectedChoices = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/pushSelectedChoices",
        {
          selectedChoices: selectedChoicesId,
        },
        {
          withCredentials: true,
        }
      );
      alert("Data submitted successfully");
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }
  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error fetching data</p>
      </div>
    );
  }

  return (
    <>
      <FilterSection
        dataForFilterBox={dataForFilterBox}
        onApply={handleFilter}
        onClear={handleClearFilter}
      ></FilterSection>
      <div className="flex flex-col lg:flex-row gap-2 max-w-[1600px] w-full overflow-hidden ">
        <LeftChoiceSelection
          slectedChoicesId={selectedChoicesId}
          allchoices={allChoicesAfterFilter}
          selectChoice={selectChoice}
        ></LeftChoiceSelection>
        <RightSelectedChoices
          selectedChoicesDetails={selectedChoicesDetails}
          upChoice={upChoice}
          downChoice={downChoice}
          swapChoices={swapChoices}
          deleteChoice={deleteChoice}
          submitSelectedChoices={submitSelectedChoices}
        ></RightSelectedChoices>
      </div>
    </>
  );
};

export default ChoicesSelection;
