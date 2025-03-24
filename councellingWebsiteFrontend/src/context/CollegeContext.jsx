import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const CollegeContext = createContext();

const initialState = {
  collegeType: null,
  collegeId: null,
  branchId: null,
  year: null,
  category: null,
  colleges: [],
  branches: [],
  responseData: null, 
  loading: false,
};

const collegeReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLLEGE_TYPE":
      return { ...state, collegeType: action.payload, collegeId: "all", branchId: "all", branches: [] };

    case "SET_COLLEGE_ID":
      return { ...state, collegeId: action.payload, branchId: "all", branches: [] };

    case "SET_BRANCH_ID":
      return { ...state, branchId: action.payload };

    case "SET_YEAR":
      return { ...state, year: action.payload };

    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    case "SET_COLLEGES":
      return { ...state, colleges: action.payload };

    case "SET_BRANCHES":
      return { ...state, branches: action.payload };

    case "SET_RESPONSE_DATA":
      return { ...state, responseData: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

const CollegeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collegeReducer, initialState);

  useEffect(() => {
    const fetchColleges = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axios.get(
          `http://localhost:4000/api/colleges-info/collegelist?collegeType=${state.collegeType}`
        );
        dispatch({ type: "SET_COLLEGES", payload: response.data.data });
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchColleges();
  }, [state.collegeType]);

  useEffect(() => {
    const fetchBranches = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        let url = `http://localhost:4000/api/colleges-info/collegelist?collegeType=${state.collegeType}&collegeId=${state.collegeId}`;
              
        const response = await axios.get(url);
        dispatch({ type: "SET_BRANCHES", payload: response.data.data });
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

      fetchBranches();
  }, [state.collegeId, state.collegeType]);


  const fetchFilteredData = async (page = 1, limit = 20) => {
    dispatch({ type: "SET_LOADING", payload: true });
  
    try {
      const response = await axios.get(
        `http://localhost:4000/api/colleges-info/collegelist?collegeType=${state.collegeType}&collegeId=${state.collegeId}&branchId=${state.branchId}&year=${state.year}&category=${state.category}&page=${page}&limit=${limit}`
      );
  
      dispatch({ type: "SET_RESPONSE_DATA", payload: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: "SET_RESPONSE_DATA", payload: { error: "Failed to fetch data" } });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  

  return <CollegeContext.Provider value={{ state, dispatch, fetchFilteredData }}>{children}</CollegeContext.Provider>;
};

export { CollegeContext, CollegeProvider };
