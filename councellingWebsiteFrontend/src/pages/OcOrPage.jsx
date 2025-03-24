import { useCollege } from "../hooks/UseCollege";
import AllFilters from "@/components/OcOrPageComponents/Filters";
import OutputTable from "@/components/OcOrPageComponents/Table";

const OcOrPage = () => {
  const { state, fetchFilteredData } = useCollege();

  return (
    <div className="container max-w-7xl mx-auto">
      <AllFilters onFetch={() => fetchFilteredData(1)} />
      {state.responseData && <OutputTable data={state.responseData} />}
    </div>
  );
};

export default OcOrPage;
